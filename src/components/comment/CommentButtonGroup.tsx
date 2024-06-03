import React from 'react';
import GrayButton from "@/components/buttons/GrayButton";
import { BsArrowReturnRight } from "react-icons/bs";

interface ButtonGroupProps {
  onEdit: () => void;
  onDelete: () => void;
  onReply?: () => void;
}

const ButtonGroup = ({ onEdit, onDelete, onReply }: ButtonGroupProps) => {
  return (
    <div className="flex justify-between mt-2">
      <button 
        className="flex items-center justify-center h-[30px] bg-transparent border-none cursor-pointer" 
        onClick={onReply}
      >
        <BsArrowReturnRight className='w-[35px] h-[22px] text-gray-500' />
        <p className='text-gray-500'>답글 달기</p>
      </button>
      <div className="flex gap-2">
        <GrayButton text="수정" size="mini" onClick={onEdit} />
        <GrayButton text="삭제" size="mini" onClick={onDelete} />
      </div>
    </div>
  );
};

export default ButtonGroup;
