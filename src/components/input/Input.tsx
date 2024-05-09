import React from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, type }) => {
  return (
    <div className="flex justify-between items-center mt-[30px] h-12">
      <label htmlFor={id} className="w-auto text-[20px]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="border border-gray-200 focus:outline-[#05A8FF]  rounded-md text-[16px] h-full w-[428px] pl-[30px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
