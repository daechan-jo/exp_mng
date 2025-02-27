// components/dashboard/ProductListItem.tsx
import React, { useState } from 'react';
import { Exp } from '../../models/Exp.ts';

interface ProductListItemProps {
  product: Exp;
  onToggleCheck: (id: number) => void;
  showAnimation: boolean;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onToggleCheck,
  showAnimation,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const isChecked = product.status;
  const expDate = new Date(product.exp);
  const isPastExp = expDate < new Date();

  const handleToggle = () => {
    setIsRemoving(true);
    // 애니메이션 시간 후 상태 변경
    setTimeout(() => {
      onToggleCheck(product.id);
    }, 300);
  };

  return (
    <div
      className={`rounded-lg border transition-all duration-300 ${
        isRemoving ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
      } ${
        isChecked
          ? 'bg-green-50 border-green-200'
          : isPastExp
            ? 'bg-white border-red-300 shadow-md'
            : 'bg-white border-blue-300 shadow-md'
      } ${showAnimation ? 'animate-fade-in' : ''}`}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <p>
                기한 :{' '}
                {expDate.toLocaleDateString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <span className="mx-2">•</span>
              <p>수량: {product.amount}개</p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className={`px-3 py-1 rounded-full flex items-center ${
              isChecked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {isChecked ? '취소' : '수거'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
