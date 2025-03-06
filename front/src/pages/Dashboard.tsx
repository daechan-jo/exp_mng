import React, { useEffect, useState } from 'react';
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
    loadData,
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

  // 매 분마다 pending 탭에서 데이터 새로고침
  useEffect(() => {
    let timeoutId: number | null = null;
    let intervalId: number | null = null;

    if (activeTab === 'pending') {
      // 다음 분까지 남은 시간 계산 (밀리초)
      const now = new Date();
      const secondsUntilNextMinute = 60 - now.getSeconds();
      const msUntilNextMinute = secondsUntilNextMinute * 1000 - now.getMilliseconds();

      // 첫 번째 실행은 다음 분이 시작될 때
      timeoutId = window.setTimeout(() => {
        // 분이 바뀌면 데이터 로드
        loadData();

        // 이후 매 분마다 실행
        intervalId = window.setInterval(() => {
          loadData();
        }, 60000); // 60초 = 1분
      }, msUntilNextMinute);
    }

    // 컴포넌트 언마운트 또는 탭 변경 시 타이머 정리
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [activeTab, loadData]);

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
