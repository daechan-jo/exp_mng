import React, { useState } from 'react';
import { Product } from '../../models/Product';

interface ExpData {
  productId: number;
  deadline: string;
  stock: number;
}

interface AddExpModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (expData: ExpData) => void;
}

const AddExpModal: React.FC<AddExpModalProps> = ({ isOpen, product, onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stock, setStock] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors: Record<string, string> = {};
    if (!date) newErrors.date = '날짜를 선택해주세요.';
    if (!time) newErrors.time = '시간을 선택해주세요.';
    if (!stock || parseInt(stock) <= 0) newErrors.stock = '유효한 수량을 입력해주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 날짜와 시간 조합
    const deadline = `${date}T${time}:00`;

    onSave({
      productId: product.id,
      deadline,
      stock: parseInt(stock),
    });

    // 폼 초기화
    setDate('');
    setTime('');
    setStock('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">유통기한 추가</h2>
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

        <div className="mb-4 text-gray-700">
          <p>
            <span className="font-medium">상품명:</span> {product.name}
          </p>
          <p>
            <span className="font-medium">상품코드:</span> {product.code}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              유통기한 날짜 *
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value) {
                  const { date: _, ...restErrors } = errors;
                  setErrors(restErrors);
                }
              }}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              유통기한 시간 *
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                if (e.target.value) {
                  const { time: _, ...restErrors } = errors;
                  setErrors(restErrors);
                }
              }}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              수량 *
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
                if (parseInt(e.target.value) > 0) {
                  const { stock: _, ...restErrors } = errors;
                  setErrors(restErrors);
                }
              }}
              min="1"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
          </div>

          <div className="flex justify-end mt-6 space-x-2">
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
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpModal;
