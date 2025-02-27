// components/layout/BottomNavigation.tsx
import React from 'react';
import { Home, PlusCircle, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="border-t border-gray-200 bg-white">
      <div className="flex items-center justify-around h-16 px-4 sm:h-20">
        {/* 대시보드 버튼 */}
        <button
          onClick={() => onPageChange('dashboard')}
          className={`flex flex-col items-center ${currentPage === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Home size={24} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1 sm:text-sm">대시보드</span>
        </button>

        {/* 등록 버튼 (중앙, 더 큰 버튼) */}
        <button
          onClick={() => onPageChange('register')}
          className={`flex flex-col items-center -mt-6 sm:-mt-8 ${currentPage === 'register' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <div className="bg-blue-500 rounded-full p-3 sm:p-4">
            <PlusCircle size={32} className="sm:w-8 sm:h-8" color="white" />
          </div>
          <span className="text-xs mt-1 sm:text-sm">전표등록</span>
        </button>

        {/* 관리 버튼 */}
        <button
          onClick={() => onPageChange('manage')}
          className={`flex flex-col items-center ${currentPage === 'manage' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Settings size={24} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1 sm:text-sm">관리</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
