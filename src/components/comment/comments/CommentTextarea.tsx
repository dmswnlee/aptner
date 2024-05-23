import React, { ChangeEvent } from 'react';
import { AiOutlinePicture } from "react-icons/ai";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import GrayButton from '@/components/buttons/GrayButton';

interface CommentTextareaProps {
  value: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const CommentTextarea = ({ value, charCount, image, onTextareaChange, onFileChange, onSave }: CommentTextareaProps) => {
  return (
    <div className="h-[155px] flex flex-col justify-between px-[30px] py-[15px] bg-gray_00 border border-solid border-gray_06 rounded-[5px]">
      <textarea
        className="w-full outline-none bg-gray_00"
        placeholder="댓글을 입력해 주세요. 비방,홍보글,도배글 등은 예고없이 삭제될 수 있습니다."
        value={value}
        onChange={onTextareaChange}
      />
      {image && <img src={URL.createObjectURL(image)} alt="첨부된 이미지" className="w-full h-auto mt-2" />}
      <div className="flex justify-between">
        <div className="flex items-center gap-[10px] text-sm">
          <AiOutlinePicture />
          <label className="cursor-pointer">
            사진 첨부
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
        </div>
        <div className="flex items-center gap-[6px]">
          <p className="text-gray_06">{charCount}/300자</p>
          <GrayButton text="저장" size="mini" onClick={onSave} />
        </div>
      </div>
    </div>
  );
};

export default CommentTextarea;
