// components/manage/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = '검색어를 입력하세요',
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
