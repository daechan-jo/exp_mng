import React from 'react';
import { CheckCircle, ListChecks } from 'lucide-react';

type TabType = 'pending' | 'completed';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingCount: number;
  completedCount: number;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
  pendingCount,
  completedCount,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <button
        onClick={() => onTabChange('pending')}
        className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
          activeTab === 'pending'
            ? 'bg-blue-50 border-2 border-blue-300'
            : 'bg-gray-100 border-2 border-transparent'
        }`}
      >
        <div className="flex items-center">
          <ListChecks
            size={18}
            className={`mr-2 ${activeTab === 'pending' ? 'text-blue-500' : 'text-gray-500'}`}
          />
          <span
            className={`text-sm font-medium ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}
          >
            유통기한 ASC
          </span>
        </div>
        <div className="mt-1">
          <span
            className={`text-sm ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}
          >
            오늘
          </span>
          <span
            className={`text-2xl ml-1 font-bold ${activeTab === 'pending' ? 'text-blue-900' : 'text-gray-700'}`}
          >
            {pendingCount}
          </span>
        </div>
      </button>

      <button
        onClick={() => onTabChange('completed')}
        className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
          activeTab === 'completed'
            ? 'bg-green-50 border-2 border-green-300'
            : 'bg-gray-100 border-2 border-transparent'
        }`}
      >
        <div className="flex items-center">
          <CheckCircle
            size={18}
            className={`mr-2 ${activeTab === 'completed' ? 'text-green-500' : 'text-gray-500'}`}
          />
          <span
            className={`text-sm font-medium ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}
          >
            완료 리스트
          </span>
        </div>
        <div className="mt-1">
          <span
            className={`text-sm ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}
          >
            오늘
          </span>
          <span
            className={`text-2xl ml-1 font-bold ${activeTab === 'completed' ? 'text-green-900' : 'text-gray-700'}`}
          >
            {completedCount}
          </span>
        </div>
      </button>
    </div>
  );
};

export default DashboardTabs;
