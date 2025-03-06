import React, { useState } from 'react';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import ProductList from '../components/dashboard/ProductList';
import { useExpiringProducts } from '../hooks/useExpiringProducts';

const Dashboard: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const {
    products,
    loading,
    activeTab,
    setActiveTab,
    hasMore,
    toggleCheck,
    handleLoadMore,
    pendingCount,
    completedCount,
  } = useExpiringProducts();

  // 페이지 끝에 도달 시 다음 페이지 요청
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (loading || !hasMore) return;

    const target = e.target as HTMLDivElement;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

    // 스크롤이 바닥에 가까워지면 (200px 이내) 다음 페이지 로드
    if (scrollBottom < 200) {
      handleLoadMore();
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* 탭 메뉴 */}
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingCount}
        completedCount={completedCount}
      />

      {/* 상품 목록 */}
      <ProductList
        products={products}
        loading={loading}
        activeTab={activeTab}
        onToggleCheck={toggleCheck}
        onScroll={handleScroll}
        showAnimation={showAnimation}
      />
    </div>
  );
};

export default Dashboard;
