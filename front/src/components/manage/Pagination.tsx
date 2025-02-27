// components/manage/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700'}`}
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700'}`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
