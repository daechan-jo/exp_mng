// App.tsx
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Manage from './pages/Manage';
import MobileContainer from './components/layout/MobileContainer';
import BottomNavigation from './components/layout/BottomNavigation';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // 현재 페이지에 따라 컴포넌트 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'register':
        return <Register />;
      case 'manage':
        return <Manage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MobileContainer>
      {/* 헤더 */}
      <header className="p-4 border-b border-gray-200 bg-white">
        <h1 className="text-center font-bold">
          {currentPage === 'dashboard' ? '대시보드' : currentPage === 'register' ? '등록' : '관리'}
        </h1>
      </header>

      {/* 콘텐츠 영역 */}
      <main className="flex-grow overflow-y-auto">{renderPage()}</main>

      {/* 하단 네비게이션 바 */}
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </MobileContainer>
  );
};

export default App;
