// pages/Register.tsx
import React from 'react';
import { Camera } from 'lucide-react';

const Register: React.FC = () => {
  // 촬영 핸들러
  const handleCapture = () => {
    console.log('Capture photo');
  };

  // 갤러리 선택 핸들러
  const handleSelectFromGallery = () => {
    console.log('Select from gallery');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-xl font-bold mb-2">상품 촬영</h1>
      <p className="text-sm text-gray-600 mb-3">물류정보를 카메라로 촬영하여 서버로 전송합니다.</p>

      {/* flex-grow를 사용하여 남은 공간을 차지하게 함 */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          {/* aspect-ratio를 사용하여 비율 유지하되 화면 크기에 맞게 조정 */}
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-3">
            <div className="text-center">
              <Camera size={36} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">카메라 촬영 영역</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h2 className="font-medium mb-2 text-sm">촬영 가이드</h2>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 바코드가 잘 보이도록 촬영해주세요</li>
              <li>• 유통기한 정보가 선명하게 나오도록 해주세요</li>
              <li>• 어두운 곳에서는 플래시를 사용해주세요</li>
            </ul>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="space-y-2 mt-auto mb-4">
          <button
            onClick={handleCapture}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium"
          >
            촬영하기
          </button>
          <button
            onClick={handleSelectFromGallery}
            className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-medium"
          >
            갤러리에서 선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
