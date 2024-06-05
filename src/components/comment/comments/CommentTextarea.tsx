import React, { useState, ChangeEvent } from 'react';
import { AiOutlinePicture } from "react-icons/ai";
import GrayButton from '@/components/buttons/GrayButton';
import ImagePreviewModal from './ImagePreviewModal';

// CommentTextarea 컴포넌트
interface CommentTextareaProps {
  value: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSave: () => void;
}

const CommentTextarea = ({ value, charCount, image, onTextareaChange, onFileChange, onRemoveImage, onSave }: CommentTextareaProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 이미지 미리보기 모달 상태

  // 이미지 클릭 핸들러
  const handleImageClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[155px] flex flex-col justify-between px-[30px] py-[15px] bg-gray_00 border border-solid border-gray_06 rounded-[5px]">
      <textarea
        className="w-full outline-none bg-gray_00"
        placeholder="댓글을 입력해 주세요. 비방,홍보글,도배글 등은 예고없이 삭제될 수 있습니다."
        value={value}
        onChange={onTextareaChange}
      />
      <div className="flex justify-between mt-2">
        <div className="flex items-center text-sm">
          <AiOutlinePicture />
          <label className="cursor-pointer flex items-center ml-2">
            {image ? "사진 변경" : "사진 첨부"}
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            {image && (
              <>
                <button onClick={onRemoveImage} className="ml-1 text-black p-1 rounded">X 사진 삭제</button>
                <span onClick={handleImageClick} className="ml-1 cursor-pointer text-blue-500 underline">{image.name}</span>
              </>
            )}
          </label>
        </div>
        <div className="flex items-center gap-[6px]">
          <p className="text-gray_06">{charCount}/300자</p>
          <GrayButton text="저장" size="mini" onClick={onSave} />
        </div>
      </div>
      {isModalOpen && <ImagePreviewModal image={image} onClose={handleCloseModal} />}
    </div>
  );
};

export default CommentTextarea;
