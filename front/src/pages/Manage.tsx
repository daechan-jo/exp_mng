import React, { useState, useEffect } from 'react';
import { Product, sampleProduct } from '../models/Product';
import SearchBar from '../components/manage/SearchBar';
import ProductListItem from '../components/manage/ProductListItem';
import Pagination from '../components/manage/Pagination';
import EditProductModal from '../components/manage/EditProductModal';

const Manage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(sampleProduct);
  }, []);

  // 검색어로 필터링
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.code.toLowerCase().includes(searchText.toLowerCase()),
  );

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
  const handleDelete = (id: number) => {
    // 실제 구현에서는 확인 대화상자를 표시하고 삭제 API 호출
    setProducts(products.filter((product) => product.id !== id));
  };

  // 상품 저장 핸들러
  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    );
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
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: '새 상품',
      code: `P${String(products.length + 1).padStart(3, '0')}`,
      stock: 0,
    };

    setSelectedProduct(newProduct);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 h-full">
      <h1 className="text-xl font-bold mb-4">상품 관리</h1>

      <div className="mb-4">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="상품명 또는 상품코드 검색"
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">총 {filteredProducts.length}개 상품</p>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          + 상품 추가
        </button>
      </div>

      <div className="space-y-3 mb-10">
        {currentItems.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
