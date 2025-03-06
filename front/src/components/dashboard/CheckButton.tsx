import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CheckButtonProps {
  isChecked: boolean;
  onToggle: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({ isChecked, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`ml-4 flex-shrink-0 p-2 rounded-full transition-colors ${
        isChecked
          ? 'bg-green-100 text-green-600'
          : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-500'
      }`}
    >
      <CheckCircle size={20} />
    </button>
  );
};

export default CheckButton;
