import { FaSearch } from 'react-icons/fa';
import Link from "next/link";

const Searchbar = () => {
  return (
    <div className="bg-[#174d50] h-12 flex justify-center">
      <div className="w-[800px] flex justify-end items-center relative"> {/* Adjust width to your preference */}
        <div className="relative">
          <input 
            type="text" 
            className="text-sm h-7 w-[300px] p-1 pl-3 pr-8 rounded-lg mr-5 focus:outline-none focus:bg-gray-100"
          />
          <FaSearch className="absolute right-7 top-[6px] text-gray-400" />
        </div>
        <Link href="/login" className="text-xs text-white mr-2">로그인</Link>
        <span className="text-white mx-2">|</span>
        <Link href="/join" className="text-xs text-white ml-2">회원가입</Link>
      </div>
    </div>
  );
};

export default Searchbar;
