import React from 'react';
import { formatDate, getTimeRemaining, getTimeColor } from '../../utils/dateUtils';

interface ProductInfoProps {
  productName: string;
  deadline: string | Date;
  stock: number;
  standard: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productName, deadline, stock, standard }) => {
  const timeRemaining = getTimeRemaining(deadline);
  const timeColor = getTimeColor(timeRemaining);

  return (
    <div className="flex-1">
      {/* 상품 이름 */}
      <h3 className="font-medium text-gray-900">{productName}</h3>

      {/* 유통기한 및 남은 시간 */}
      <div className="flex items-center mt-1 text-sm">
        <span className="text-gray-600">유통기한:</span>
        <span className="ml-1">{formatDate(deadline)}</span>
        {timeRemaining !== null && (
          <span className={`ml-2 font-medium ${timeColor}`}>({timeRemaining})</span>
        )}
      </div>

      {/* 규격, 수량 */}
      <div className="mt-1 text-sm text-gray-600 flex gap-4">
        <span>규격: {standard || 'null'}</span>
        <span>수량: {stock || 0}개</span>
      </div>
    </div>
  );
};

export default ProductInfo;
