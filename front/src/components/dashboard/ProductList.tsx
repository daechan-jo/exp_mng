import React from 'react';
import { ExpProduct } from '../../models/ExpProduct';
import ProductListItem from './ProductListItem';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProductListProps {
  products: ExpProduct[];
  loading: boolean;
  activeTab: 'pending' | 'completed';
  onToggleCheck: (id: number) => Promise<void>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  showAnimation?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  activeTab,
  onToggleCheck,
  onScroll,
  showAnimation = false,
}) => {
  return (
    <div
      className="flex-grow overflow-y-auto bg-gray-50 rounded-lg mb-4 h-[calc(100vh-200px)]"
      onScroll={onScroll}
    >
      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <p>
            {activeTab === 'pending'
              ? '오늘 확인이 필요한 상품이 없습니다.'
              : '오늘 확인 완료한 상품이 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 p-3">
          {products.map((product) => (
            <ProductListItem
              key={product.expId}
              product={product}
              onToggleCheck={onToggleCheck}
              showAnimation={showAnimation}
            />
          ))}
        </div>
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default ProductList;
