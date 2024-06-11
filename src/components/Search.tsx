'use client';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [search, setSearch] = useState<string>(''); 
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    if (search.trim() !== '') {
      router.push(`/mainsearch?keyword=${search}`); // 검색 결과 페이지로 이동
      setSearch(''); // 검색어 상태 초기화
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); 
    }
  };

  useEffect(() => {
    setSearch(''); // 페이지 로드 시 검색어 상태 초기화
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="text-sm h-[40px] w-[320px] pl-5 rounded-[10px] border border-solid border-[#BBBBBB] focus:outline-none focus:bg-gray-100"
        placeholder="검색하기"
      />
      <FaSearch
        className="absolute top-1/2 transform -translate-y-1/2 left-[290px] text-gray-400 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
