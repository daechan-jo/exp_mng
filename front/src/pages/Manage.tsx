import React from 'react';
import SearchBar from '../components/manage/SearchBar';
import ProductListItem from '../components/manage/ProductListItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EditProductModal from '../components/manage/EditProductModal';
import AddExpModal from '../components/manage/AddExpModal';
import { useProductManagement } from '../hooks/useProductMangement.ts';

const Manage: React.FC = () => {
  const {
    products,
    searchText,
    isLoading,
    totalItems,
    selectedProduct,
    isEditModalOpen,
    isAddExpModalOpen,
    scrollContainerRef,
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
  } = useProductManagement();

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4">상품 관리</h1>

      <div className="mb-4">
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

      {/* 상품 목록 - 스크롤 이벤트 추가 */}
      <div
        className="flex-grow overflow-y-auto bg-gray-50 rounded-lg mb-4 h-[calc(100vh-200px)]"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        {products.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p>{searchText ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}</p>
          </div>
        ) : (
          <div className="space-y-3 p-3">
            {products.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onAddExp={() => handleAddExp(product)}
              />
            ))}
          </div>
        )}

        {/* 로딩 스피너는 하단에 표시 */}
        {isLoading && (
          <div className="py-4">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {/* 상품 편집/추가 모달 */}
      <EditProductModal
        isOpen={isEditModalOpen}
        product={selectedProduct}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
        onDelete={handleDelete}
      />

      {/* 유통기한 추가 모달 */}
      <AddExpModal
        isOpen={isAddExpModalOpen}
        product={selectedProduct}
        onClose={() => setIsAddExpModalOpen(false)}
        onSave={handleSaveExpiration}
      />
    </div>
  );
};

export default Manage;
