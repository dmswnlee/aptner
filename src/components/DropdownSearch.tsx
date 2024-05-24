import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface DropdownSearchProps {
  onSelect: (selectedOption: Option) => void;
}

const DropdownSearch = ({ onSelect }: DropdownSearchProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: Option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  const searchOptions: Option[] = [
    { value: "title_content", label: "제목 + 내용" },
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "author", label: "작성자" },
  ];

  return (
    <div className="relative">
      <button
        className={`flex items-center text-[15px] h-[38px] w-[128px] pl-3 pr-3 rounded-md border ${isDropdownOpen ? 'border-gray-400' : 'border-gray-400'} border-solid text-gray-700 focus:outline-none focus:bg-gray-100`}
        onClick={toggleDropdown}
      >
        <span className="flex-1 text-left ml-2">검색조건</span>
        <FaAngleDown className="mr-2" />
      </button>
      <div
        className={`absolute top-full left-0 w-full bg-white border-gray-400 border border-solid border-t-0 rounded-b-md shadow-md transition-all duration-300 overflow-hidden ${
          isDropdownOpen ? "max-h-[250px]" : "max-h-0 border-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <ul>
          {searchOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="cursor-pointer px-5 py-2 hover:bg-gray-100 text-[15px]"
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSearch;
