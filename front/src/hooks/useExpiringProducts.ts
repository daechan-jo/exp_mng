import { useState, useEffect, useCallback, useRef } from 'react';
import { ExpProduct } from '../models/ExpProduct';
import {
  fetchExpiringProducts,
  toggleProductStatus,
  fetchTodayPendingCount,
} from '../services/productService';

type TabType = 'pending' | 'completed';

export const useExpiringProducts = () => {
  const [products, setProducts] = useState<ExpProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [todayPendingCount, setTodayPendingCount] = useState(0);
  const [todayCompletedCount, setTodayCompletedCount] = useState(0);

  const loadingRef = useRef(false);
  const prevPageRef = useRef(0);
  const prevTabRef = useRef<TabType>('pending');
  const requestIdRef = useRef<string>('');

  const loadData = useCallback(async () => {
    if (loading || (!hasMore && page > 0)) return;

    const currentRequestId = `${activeTab}-${page}`;
    if (loadingRef.current && requestIdRef.current === currentRequestId) {
      return;
    }

    // 현재 요청 정보 저장
    loadingRef.current = true;
    requestIdRef.current = currentRequestId;
    prevPageRef.current = page;
    prevTabRef.current = activeTab;

    setLoading(true);

    try {
      const data = await fetchExpiringProducts(activeTab, page);

      // 마지막 페이지일 때만 hasMore를 false로 설정
      if (!data.content || data.content.length === 0 || data.last) {
        setHasMore(false);
      }

      // 첫 페이지면 데이터 교체, 아니면 추가
      if (page === 0) {
        setProducts(data.content);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.content]);
      }

      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [activeTab, loading, page, hasMore]);

  // 오늘 확인/완료 카운트
  const loadTodayCount = useCallback(async () => {
    const data = await fetchTodayPendingCount();
    console.log('loadTodayCount', data.trueCount);
    setTodayPendingCount(data.falseCount);
    setTodayCompletedCount(data.trueCount);
  }, []);

  // 초기 로드 및 주기적 업데이트
  useEffect(() => {
    loadTodayCount();

    // 주기적으로 카운트 업데이트 (선택사항)
    // const intervalId = setInterval(loadTodayCount, 10000);

    // return () => clearInterval(intervalId);
  }, [loadTodayCount]);

  // 탭 변경 시 데이터 초기화 및 첫 페이지 로드
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);

    prevTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const currentRequestId = `${activeTab}-${page}`;
    if (requestIdRef.current !== currentRequestId) {
      loadData();
    }
  }, [activeTab, page, loadData]);

  // 체크 상태 토글
  const toggleCheck = async (id: number) => {
    try {
      await toggleProductStatus(id, activeTab);

      // 데이터 다시 로드 (loadData와 loadTodayCount를 순차적으로 실행)
      setPage(0);
      setHasMore(true);
      requestIdRef.current = '';

      // 먼저 데이터를 로드한 후, 그 다음에 카운트를 업데이트
      await loadData();
      await loadTodayCount();

      // UI 업데이트 (필터링은 데이터와 카운트 업데이트 후에 실행)
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            (activeTab === 'pending' && !product.status) ||
            (activeTab === 'completed' && product.status),
        ),
      );
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  return {
    products,
    loading,
    activeTab,
    setActiveTab,
    hasMore,
    toggleCheck,
    handleLoadMore: () => setPage((prevPage) => prevPage + 1),
    pendingCount: todayPendingCount || 0,
    completedCount: todayCompletedCount || 0,
    loadData,
  };
};
