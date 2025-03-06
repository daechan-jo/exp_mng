import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/Product';
import SearchBar from '../components/manage/SearchBar';
import ProductListItem from '../components/manage/ProductListItem';
import Pagination from '../components/manage/Pagination';
import EditProductModal from '../components/manage/EditProductModal';
import {
  searchProducts,
  fetchProducts,
  deleteProduct,
  saveProduct,
} from '../services/productService';

const Manage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  // 상품 데이터 로드
  const loadProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error('상품 데이터 로드 실패:', error);
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // 검색어 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchText) {
        setIsLoading(true);
        try {
          // 서버에 검색 요청
          const results = await searchProducts(searchText);
          setFilteredProducts(results);
          setTotalItems(results.length);
          setCurrentPage(1); // 검색 결과가 변경되면 첫 페이지로 이동
        } catch (error) {
          console.error('검색 실패:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // 검색어가 없으면 전체 상품 표시
        setFilteredProducts(products);
        setTotalItems(products.length);
      }
    }, 500); // 사용자가 타이핑을 멈춘 후 500ms 후에 검색 실행

    return () => clearTimeout(timer);
  }, [searchText, products]);

  // 페이지네이션
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  // 상품 편집 핸들러
  const handleEdit = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  // 상품 삭제 핸들러
  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      try {
        await deleteProduct(id);
        // 삭제 후 목록 다시 로드
        loadProducts();
      } catch (error) {
        console.error('상품 삭제 실패:', error);
        alert('상품 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 상품 저장 핸들러
  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      await saveProduct(updatedProduct);
      handleCloseModal();
      // 저장 후 목록 다시 로드
      loadProducts();
    } catch (error) {
      console.error('상품 저장 실패:', error);
      alert('상품 저장 중 오류가 발생했습니다.');
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // 상품 추가 핸들러
  const handleAddProduct = () => {
    // 새 상품을 위한 기본 객체 생성
    const newProduct: Product = {
      id: 0, // 서버에서 ID 부여
      name: '',
      code: '',
      standard: '1',
    };

    setSelectedProduct(newProduct);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 h-full">
      <h1 className="text-xl font-bold mb-4">상품 관리</h1>

      <div className="mb-4 relative">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="상품명 또는 상품코드 검색"
          isLoading={isLoading}
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">총 {totalItems}개 상품</p>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
        >
          <span className="mr-1">+</span> 상품 추가
        </button>
      </div>

      <div className="space-y-3 mb-10">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            {searchText ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 상품 편집/추가 모달 */}
      <EditProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Manage;
