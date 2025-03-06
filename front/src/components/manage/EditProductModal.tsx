import React, { useState, useEffect } from 'react';
import { Product } from '../../models/Product';

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  onDelete: (id: number) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        code: product.code,
        standard: product.standard,
        price: product.price,
      });
      setErrors({});
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 유효성 검사
    if (name === 'name' && !value.trim()) {
      setErrors({ ...errors, name: '상품명을 입력해주세요.' });
    } else if (name === 'code' && !value.trim()) {
      setErrors({ ...errors, code: '상품코드를 입력해주세요.' });
    } else {
      const { [name]: _, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = '상품명을 입력해주세요.';
    if (!formData.code?.trim()) newErrors.code = '상품코드를 입력해주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData as Product);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      onDelete(product.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{product.id ? '상품 수정' : '상품 추가'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              상품명 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              상품코드 *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code || 'null'}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
              규격
            </label>
            <input
              type="text"
              id="standard"
              name="standard"
              value={formData.standard || 'null'}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              가격 *
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>

          <div className="flex justify-between mt-6">
            {product.id > 0 && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                삭제
              </button>
            )}
            <div className="flex space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
