import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setQuery, searchCommunications } from "@/stores/slice/communicationsSlice";

interface Option {
  value: string;
  label: string;
}

interface SearchProps {
  selectedOption: Option;
  onSearch: (query: string) => void;
}

const SearchBoard = ({ selectedOption, onSearch }: SearchProps) => {
  const [query, setQueryState] = useState(""); // 로컬 상태로 검색 쿼리를 관리
  const dispatch = useDispatch(); // Redux 디스패치를 사용

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    dispatch(setQuery(query)); // Redux 상태에 검색 쿼리 설정
    dispatch(searchCommunications()); // 검색 액션 디스패치
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQueryState(e.target.value)} // 입력 필드 변경 시 로컬 상태 업데이트
          placeholder={selectedOption.value ? `${selectedOption.label}(으)로 검색하기` : '검색어를 입려하세요.'}
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
