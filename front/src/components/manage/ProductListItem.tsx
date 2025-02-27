// components/manage/ProductListItem.tsx
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../models/Product.ts';
// import { formatDate } from '../../utils/dateUtils';

interface ProductListItemProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    // 삭제 애니메이션 시작
    setIsDeleting(true);

    // 애니메이션 종료 후 실제 삭제 수행
    setTimeout(() => {
      onDelete(product.id);
    }, 300); // 애니메이션 지속 시간과 일치
  };

  return (
    <div
      className={`
        bg-white shadow-md rounded-lg p-4 flex justify-between items-center 
        transition-all duration-300 ease-in-out
        ${isDeleting ? 'opacity-0 scale-95 h-0 py-0 overflow-hidden' : 'opacity-100 scale-100'}
      `}
    >
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
            상품코드: {product.code}
          </span>
          <p className="text-sm text-gray-500">재고: 나중에</p>
        </div>
      </div>
      <div className="flex">
        <button onClick={() => onEdit(product.id)} className="text-blue-500 p-1 mr-1">
          <Edit size={18} />
        </button>
        <button onClick={handleDelete} className="text-red-500 p-1">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
