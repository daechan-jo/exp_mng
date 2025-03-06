import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../models/Product';
import {
  searchProducts,
  fetchProductsPage,
  deleteProduct,
  saveProduct,
  addExpiration,
} from '../services/productService';

export const useProductManagement = () => {
  // 상품 관련 상태
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddExpModalOpen, setIsAddExpModalOpen] = useState(false);

  // 무한 스크롤을 위한 상태
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // 요청 상태 관리를 위한 ref
  const loadingRef = useRef(false);
  const requestIdRef = useRef<string>('');
  const prevSearchRef = useRef('');

  // 스크롤 컨테이너 ref
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 초기화 함수
  const resetScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  // 상품 데이터 로드
  const loadData = useCallback(async () => {
    if (isLoading || (!hasMore && page > 0)) return;

    const currentRequestId = `${searchText}-${page}`;
    if (loadingRef.current && requestIdRef.current === currentRequestId) {
      return;
    }

    // 현재 요청 정보 저장
    loadingRef.current = true;
    requestIdRef.current = currentRequestId;
    prevSearchRef.current = searchText;

    setIsLoading(true);

    try {
      // 검색어가 있으면 검색 API, 없으면 일반 목록 API 호출
      const data = searchText.trim()
        ? await searchProducts(searchText, page)
        : await fetchProductsPage(page);

      // 마지막 페이지 체크
      if (!data.content || data.content.length === 0 || data.last) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      // 첫 페이지면 데이터 교체, 아니면 추가
      if (page === 0) {
        setProducts(data.content);
        // 첫 페이지 로드 후 스크롤 초기화
        resetScroll();
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.content]);
      }

      setTotalItems(data.totalElements);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [isLoading, searchText, page, hasMore, resetScroll]);

  // 초기 데이터 로드 및 페이지/검색어 변경 시 데이터 로드
  useEffect(() => {
    const currentRequestId = `${searchText}-${page}`;
    if (requestIdRef.current !== currentRequestId) {
      loadData();
    }
  }, [searchText, page, loadData]);

  // 검색어 디바운스 처리
  useEffect(() => {
    if (prevSearchRef.current !== searchText) {
      const timer = setTimeout(() => {
        // 검색어 변경 시 첫 페이지부터 다시 로드
        setPage(0);
        setHasMore(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchText]);

  // 스크롤 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 현재 스크롤 컨테이너 ref 저장
    scrollContainerRef.current = e.target as HTMLDivElement;

    if (isLoading || !hasMore) return;

    const target = e.target as HTMLDivElement;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

    // 스크롤이 바닥에 가까워지면 (200px 이내) 다음 페이지 로드
    if (scrollBottom < 200) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 상품 편집 핸들러
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // 유통기한 추가 핸들러
  const handleAddExp = (product: Product) => {
    setSelectedProduct(product);
    setIsAddExpModalOpen(true);
  };

  // 상품 삭제 핸들러
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      // 삭제 후 첫 페이지부터 다시 로드
      resetAndRefetch();
    } catch (error) {
      console.error('상품 삭제 실패:', error);
      alert('상품 삭제 중 오류가 발생했습니다.');
    }
  };

  // 상품 저장 핸들러
  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      await saveProduct(updatedProduct);
      setIsEditModalOpen(false);
      // 저장 후 첫 페이지부터 다시 로드
      resetAndRefetch();
    } catch (error) {
      console.error('상품 저장 실패:', error);
      alert('상품 저장 중 오류가 발생했습니다.');
    }
  };

  // 상품 추가 핸들러
  const handleAddProduct = () => {
    // 새 상품을 위한 기본 객체 생성
    const newProduct: Product = {
      id: 0, // 서버에서 ID 부여
      name: '',
      code: '',
      standard: 1,
      price: 0,
    };

    setSelectedProduct(newProduct);
    setIsEditModalOpen(true);
  };

  // 유통기한 저장 핸들러
  const handleSaveExpiration = async (expData: {
    productId: number;
    deadline: string;
    stock: number;
  }) => {
    try {
      await addExpiration(expData);
      setIsAddExpModalOpen(false);
      // 저장 후 데이터 다시 로드
      resetAndRefetch();
    } catch (error) {
      console.error('유통기한 추가 실패:', error);
      alert('유통기한 추가 중 오류가 발생했습니다.');
    }
  };

  // 데이터 리셋 및 재로드 헬퍼 함수
  const resetAndRefetch = () => {
    setPage(0);
    setHasMore(true);
    requestIdRef.current = '';
    loadData();
  };

  return {
    // 상태
    products,
    searchText,
    isLoading,
    hasMore,
    totalItems,
    selectedProduct,
    isEditModalOpen,
    isAddExpModalOpen,
    scrollContainerRef,

    // 액션
    setSearchText,
    handleScroll,
    handleEdit,
    handleAddExp,
    handleDelete,
    handleSaveProduct,
    handleAddProduct,
    handleSaveExpiration,
    setIsEditModalOpen,
    setIsAddExpModalOpen,
    resetScroll,
  };
};
