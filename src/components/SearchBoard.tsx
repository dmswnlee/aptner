import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface SearchProps {
  selectedOption: Option;
  onSearch: (query: string) => void;
}

const SearchBoard = ({ selectedOption, onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={selectedOption.label ? `${selectedOption.label}(으)로 검색하기` : '검색하기'}
          className="text-sm h-[40px] w-[280px] pl-5 rounded-[10px] border border-solid border-[#BBBBBB] focus:outline-none focus:bg-gray-100"
        />
        <FaSearch 
          onClick={handleSearch}
          className="absolute top-1/2 transform -translate-y-1/2 right-[10px] text-gray-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchBoard;
