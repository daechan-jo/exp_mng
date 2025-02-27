// components/manage/ProductListItem.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../models/Product';
import { formatDate } from '../../utils/dateUtils';

interface ProductListItemProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
              {product.category}
            </span>
            <p className="text-sm text-gray-500">유통기한: {formatDate(product.expiryDate)}</p>
          </div>
        </div>
        <div className="flex">
          <button onClick={() => onEdit(product.id)} className="text-blue-500 p-1 mr-1">
            <Edit size={18} />
          </button>
          <button onClick={() => onDelete(product.id)} className="text-red-500 p-1">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
