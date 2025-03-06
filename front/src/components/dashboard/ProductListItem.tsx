import React from 'react';
import { ExpProduct } from '../../models/ExpProduct';
import ProductInfo from './ProductInfo';
import CheckButton from './CheckButton';

interface ProductListItemProps {
  product: ExpProduct;
  onToggleCheck: (id: number) => void;
  showAnimation: boolean;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onToggleCheck,
  showAnimation,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-3 border border-gray-200 transition-all duration-200 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-100 opacity-100'
      }`}
    >
      <div className="flex justify-between items-center">
        <ProductInfo
          productName={product.productName}
          deadline={product.deadline}
          stock={product.stock}
          standard={product.standard}
        />

        <CheckButton isChecked={product.status} onToggle={() => onToggleCheck(product.expId)} />
      </div>
    </div>
  );
};

export default ProductListItem;
