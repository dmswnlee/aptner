"use client"
import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          className="text-sm h-[40px] w-[320px] pl-5 rounded-[10px] border border-solid border-[#BBBBBB] focus:outline-none focus:bg-gray-100"
          placeholder="검색하기"
        />
        <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-[290px] text-gray-400" />
      </div>
    </div>
  );
};

export default Search;