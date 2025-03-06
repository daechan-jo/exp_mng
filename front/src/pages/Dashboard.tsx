import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, ListChecks } from 'lucide-react';
import ProductListItem from '../components/dashboard/ProductListItem';
import { ExpProduct } from '../models/ExpProduct.ts';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ExpProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [showAnimation, setShowAnimation] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 요청하지 않음

    setLoading(true);

    try {
      const url =
        activeTab === 'pending'
          ? `http://localhost:8080/api/products/expiring?page=${page}&size=10&status=false`
          : `http://localhost:8080/api/products/expiring?page=${page}&size=10&status=true`;

      const response = await fetch(url);
      const data = await response.json();

      console.log('API Response:', data); // 응답 데이터 확인용 로그

      // 마지막 페이지(last=true)일 때만 hasMore를 false로 설정
      if (!data.content || data.content.length === 0 || data.last) {
        setHasMore(false);
        // return 문은 제거하세요! 응답된 데이터는 처리해야 합니다
      }

      // 첫 페이지면 데이터 교체, 아니면 추가
      if (page === 0) {
        console.log('first page');
        setProducts(data.content);
      } else {
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts, ...data.content];
          console.log('Updated products:', newProducts);
          return newProducts;
        });
      }

      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, loading, page, hasMore]);

  // 탭 변경 시 데이터 초기화 및 첫 페이지 로드
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    loadData();
  }, [activeTab]);

  // 페이지 변경 시 추가 데이터 로드
  useEffect(() => {
    if (page > 0) {
      loadData();
    }
  }, [page, loadData]);

  // 페이지 끝에 도달 시 다음 페이지 요청
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (loading || !hasMore) return;

    const target = e.target as HTMLDivElement;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

    // 스크롤이 바닥에 가까워지면 (200px 이내) 다음 페이지 로드
    if (scrollBottom < 200) {
      console.log('Loading next page:', page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };
  // 체크 상태 토글
  const toggleCheck = async (id: number) => {
    try {
      // 서버에 상태 업데이트 요청
      await fetch(`http://localhost:8080/api/products/exp/${id}/toggle-status`, {
        method: 'PUT',
      });

      // UI 업데이트
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            (activeTab === 'pending' && !product.status) ||
            (activeTab === 'completed' && product.status),
        ),
      );

      // 데이터 다시 로드
      setPage(0);
      setHasMore(true);
      loadData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // 확인해야 할 상품과 확인한 상품 개수 계산
  const pendingCount = activeTab === 'pending' ? products.length : 0;
  const completedCount = activeTab === 'completed' ? products.length : 0;

  return (
    <div className="p-4 h-full flex flex-col">
      {/* 탭 메뉴 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setActiveTab('pending')}
          className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
            activeTab === 'pending'
              ? 'bg-blue-50 border-2 border-blue-300'
              : 'bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center">
            <ListChecks
              size={18}
              className={`mr-2 ${activeTab === 'pending' ? 'text-blue-500' : 'text-gray-500'}`}
            />
            <span
              className={`text-sm font-medium ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}
            >
              확인 필요
            </span>
          </div>
          <div className="mt-1">
            <span
              className={`text-2xl font-bold ${activeTab === 'pending' ? 'text-blue-900' : 'text-gray-700'}`}
            >
              {pendingCount}
            </span>
            <span
              className={`text-sm ml-1 ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}
            >
              상품
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
            activeTab === 'completed'
              ? 'bg-green-50 border-2 border-green-300'
              : 'bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center">
            <CheckCircle
              size={18}
              className={`mr-2 ${activeTab === 'completed' ? 'text-green-500' : 'text-gray-500'}`}
            />
            <span
              className={`text-sm font-medium ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}
            >
              확인 완료
            </span>
          </div>
          <div className="mt-1">
            <span
              className={`text-2xl font-bold ${activeTab === 'completed' ? 'text-green-900' : 'text-gray-700'}`}
            >
              {completedCount}
            </span>
            <span
              className={`text-sm ml-1 ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}
            >
              상품
            </span>
          </div>
        </button>
      </div>

      {/* 상품 목록 */}
      <div
        className="flex-grow overflow-y-auto bg-gray-50 rounded-lg mb-4 h-[calc(100vh-200px)]"
        onScroll={handleScroll}
      >
        {products.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p>
              {activeTab === 'pending'
                ? '확인이 필요한 상품이 없습니다.'
                : '확인 완료된 상품이 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 p-3">
            {products.map((product) => (
              <ProductListItem
                key={product.expId}
                product={product}
                onToggleCheck={toggleCheck}
                showAnimation={showAnimation}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
