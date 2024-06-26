import React from 'react';
import { BsArrowReturnRight } from "react-icons/bs";

import GrayButton from "@/components/buttons/GrayButton";

interface ButtonGroupProps {
  onEdit: () => void;
  onDelete: () => void;
  onReply?: () => void;
  showEditDelete?: boolean; 
}

const ButtonGroup = ({ onEdit, onDelete, onReply, showEditDelete }: ButtonGroupProps) => {
  return (
    <div className="flex justify-between mt-2">
      <button 
        className="flex items-center justify-center h-[30px] bg-transparent border-none cursor-pointer" 
        onClick={onReply}
      >
        <BsArrowReturnRight className='w-[35px] h-[22px] text-gray-500' />
        <p className='text-gray-500'>답글 달기</p>
      </button>
      {showEditDelete && (
        <div className="flex gap-2">
          <GrayButton text="수정" size="mini" onClick={onEdit} />
          <GrayButton text="삭제" size="mini" onClick={onDelete} />
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
