// components/register/CameraView.tsx
import React from 'react';
import { Camera } from 'lucide-react';

interface CameraViewProps {
  onCapture: () => void;
  onSelectFromGallery: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onSelectFromGallery }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-4">
          <div className="text-center">
            <Camera size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">카메라 촬영 영역</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-2">촬영 가이드</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• 바코드가 잘 보이도록 촬영해주세요</li>
            <li>• 유통기한 정보가 선명하게 나오도록 해주세요</li>
            <li>• 어두운 곳에서는 플래시를 사용해주세요</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onCapture}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium"
        >
          촬영하기
        </button>
        <button
          onClick={onSelectFromGallery}
          className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-medium"
        >
          갤러리에서 선택
        </button>
      </div>
    </div>
  );
};

export default CameraView;
