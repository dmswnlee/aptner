import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setQuery } from "@/stores/slice/communicationsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Option {
  value: string;
  label: string;
}

interface SearchProps {
  selectedOption: Option;
  onSearch: (query: string) => void;
}

const SearchBoard = ({ selectedOption, onSearch }: SearchProps) => {
  const [query, setQueryState] = useState(""); 
  const dispatch = useDispatch();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      toast.error(
        <div className="whitespace-pre-line p-2">
          글자 수가 너무 적습니다.<br />2자 이상 입력해주세요
        </div>,
        { className: "w-[300px]" }
      );
      return;
    }
    if (trimmedQuery.length > 50) {
      toast.warning(
        <div className="p-1">
          검색어는 최대 50자까지 유효합니다. 초과하는 단어는 검색 조건에 포함되지 않습니다.
        </div>);
    }
    const validQuery = trimmedQuery.slice(0, 50);
    dispatch(setQuery(validQuery));
    onSearch(validQuery);
  };

  const handleEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQueryState(e.target.value)} 
          onKeyDown={handleEnter}
          placeholder={selectedOption.value ? `${selectedOption.label}(으)로 검색하기` : '검색어를 입력하세요.'}
          className="text-sm h-[40px] w-[280px] pl-5 pr-8 rounded-[10px] border border-solid border-[#BBBBBB] focus:outline-none focus:bg-gray-100"
        />
        <FaSearch 
          onClick={handleSearch}
          className="absolute top-1/2 transform -translate-y-1/2 right-[10px] text-gray-400 cursor-pointer"
        />
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        pauseOnHover 
      />
    </div>
  );
};

export default SearchBoard;
