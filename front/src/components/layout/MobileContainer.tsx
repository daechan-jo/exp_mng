// components/layout/MobileContainer.tsx
import React, { ReactNode, useState, useEffect } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const [deviceHeight, setDeviceHeight] = useState('667px');

  useEffect(() => {
    // 화면 너비에 따라 적절한 높이 설정
    const updateDeviceHeight = () => {
      const width = window.innerWidth;
      if (width <= 375) {
        // iPhone SE, 8
        setDeviceHeight('667px');
      } else if (width <= 390) {
        // iPhone 12, 13
        setDeviceHeight('844px');
      } else if (width <= 414) {
        // iPhone XR, 11
        setDeviceHeight('896px');
      } else if (width <= 428) {
        // iPhone 12 Pro Max, 13 Pro Max
        setDeviceHeight('926px');
      } else {
        setDeviceHeight('844px'); // 기본값
      }
    };

    updateDeviceHeight();
    window.addEventListener('resize', updateDeviceHeight);

    return () => {
      window.removeEventListener('resize', updateDeviceHeight);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="relative bg-white w-full shadow-xl overflow-hidden flex flex-col"
        style={{
          maxWidth: '428px', // 가장 큰 아이폰 크기
          height: '100vh',
          maxHeight: deviceHeight,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
