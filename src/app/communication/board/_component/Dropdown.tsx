import React, { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { DropdownProps } from '@/interfaces/communication/Dropdown';

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, setSelectedOption, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setValue("categoryCode", option);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="pb-[15px] text-left flex items-center gap-[10px]"
        onClick={toggleDropdown}
        type="button"
      >
        {selectedOption}
        <IoIosArrowDown />
      </button>
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
