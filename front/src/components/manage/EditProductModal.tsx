import React, { useState, useEffect } from 'react';
import { Product } from '../../models/Product.ts';

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  // Reset the edited product when the modal opens
  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  // If the modal is not open, return null
  if (!isOpen || !editedProduct) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === 'stock' ? Number(value) : value,
          }
        : null,
    );
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">상품 수정</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">상품명</label>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="상품명을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">상품코드</label>
          <input
            type="text"
            name="code"
            value={editedProduct.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="상품코드를 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">재고</label>
          <input
            type="number"
            name="stock"
            value={editedProduct.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="재고를 입력하세요"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
