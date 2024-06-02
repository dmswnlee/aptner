import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Option 인터페이스 정의
interface Option {
  label: string;
}

// DropdownProps 인터페이스 정의
interface DropdownProps {
  options: Option[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

// Dropdown 컴포넌트 정의
const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태 관리

  // 드롭다운 토글 함수
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 옵션 선택 함수
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      {/* 선택된 옵션 표시 버튼 */}
      <button
        className="pb-[15px] text-left flex items-center gap-[10px]"
        onClick={toggleDropdown}
        type="button"
      >
        {selectedOption}
        <IoIosArrowDown />
      </button>
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul
          className="absolute px-5 py-2 left-0 ml-[11px] mt-[-10px] bg-white border rounded-sm"
          style={{ boxShadow: "0px 3px 8px 0px rgba(0, 0, 0, 0.24)" }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectOption(option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
