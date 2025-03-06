import React from 'react';
import { Product } from '../../models/Product';

interface ProductListItemProps {
  product: Product;
  onEdit: () => void;
  onAddExp: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onAddExp }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 transition-all duration-200">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* 상품 이름 */}
          <h3 className="font-medium text-gray-900">{product.name}</h3>

          {/* 상품 코드 */}
          <div className="mt-1 text-sm text-gray-600">상품코드: {product.code}</div>

          {/* 규격 */}
          <div className="mt-1 text-sm text-gray-600">규격: {product.standard || '없음'}</div>
        </div>

        <div className="flex space-x-2">
          {/* 유통기한 추가 버튼 */}
          <button
            onClick={onAddExp}
            className="flex items-center justify-center w-10 h-10 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
            title="유통기한 추가"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          {/* 수정 버튼 */}
          <button
            onClick={onEdit}
            className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
            title="수정"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
