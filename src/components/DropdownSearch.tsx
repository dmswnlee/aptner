import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleDown } from "react-icons/fa";

import { setOption } from "@/stores/slice/communicationsSlice";
import { RootState } from "@/stores/store";

interface Option {
  value: string;
  label: string;
}

interface DropdownSearchProps {
  onSelect: (selectedOption: Option) => void;
  selectedOption: Option;
}

const DropdownSearch = ({ onSelect, selectedOption }: DropdownSearchProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const option = useSelector((state: RootState) => state.communications.option);

  const searchOptions: Option[] = [
    { value: "TITLE_AND_CONTENT", label: "제목 + 내용" },
    { value: "TITLE", label: "제목" },
    { value: "CONTENT", label: "내용" },
    { value: "WRITER", label: "작성자" },
  ];

  const [currentOptionLabel, setCurrentOptionLabel] = useState("제목 + 내용");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setCurrentOptionLabel(option.label);
    onSelect(option);
    dispatch(setOption(option.value));
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center text-[15px] h-[38px] w-[128px] pl-3 pr-3 rounded-md border ${isDropdownOpen ? 'border-gray-400' : 'border-gray-400'} border-solid text-gray-700 focus:outline-none focus:bg-gray-100`}
        onClick={toggleDropdown}
      >
        <span className="flex-1 text-left ml-2">{currentOptionLabel}</span>
        <FaAngleDown className="ml-auto" />
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
