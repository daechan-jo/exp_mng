// pages/Manage.tsx
import React, { useState, useEffect } from 'react';
import { Product, sampleProducts } from '../models/Product';
import SearchBar from '../components/manage/SearchBar';
import ProductListItem from '../components/manage/ProductListItem';
import Pagination from '../components/manage/Pagination';

const Manage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  // 검색어로 필터링
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase()),
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
    // 실제 구현에서는 편집 모달을 열거나 편집 페이지로 이동
    console.log(`Edit product with ID: ${id}`);
  };

  // 상품 삭제 핸들러
  const handleDelete = (id: number) => {
    // 실제 구현에서는 확인 대화상자를 표시하고 삭제 API 호출
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4 h-full">
      <h1 className="text-xl font-bold mb-4">상품 관리</h1>

      <div className="mb-4">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="상품명 또는 카테고리 검색"
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">총 {filteredProducts.length}개 상품</p>
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+ 상품 추가</button>
      </div>

      <div className="space-y-3 mb-4">
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
    </div>
  );
};

export default Manage;
