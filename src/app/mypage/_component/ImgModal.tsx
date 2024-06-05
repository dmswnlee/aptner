import React, { useRef } from "react";
import Button from "@/components/buttons/Button";

interface ImgModalProps {
  onClose: () => void;
}

const ImgModal: React.FC<ImgModalProps> = ({ onClose }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[720px] h-[520px] flex flex-col rounded-[8px] relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
        <input
          ref={fileInputRef}
          className="hidden"
          id="userImage"
          type="file"
          accept="image/*"
        />
        <div className="mx-auto flex flex-col items-center">
          <p className="font-semibold text-[20px] mt-[64px] mb-[72px]">
            프로필사진 수정
          </p>

          <div
            onClick={handleClick}
            className="w-[80px] h-[80px] mb-10 rounded-full border-2 cursor-pointer"
          ></div>

          <div className="flex gap-[13px] mb-[34px]">
            <Button
              text="사진 선택"
              className="w-[76px] h-[38px] text-[16px] leading-[18px] py-[6px] bg-[#fafafa] text-[#5f5f5f]"
            />
            <Button
              text="사진 삭제"
              className="w-[76px] h-[38px] text-[16px] leading-[18px] py-[6px] bg-[#fafafa] text-[#5f5f5f]"
            />
          </div>
        </div>
        <Button
          text="사진 적용하기"
          className="w-[100px] mx-auto h-[32px] text-[16px] leading-[18px] py-[6px] bg-[#EEE] text-black_100"
        />
      </div>
    </div>
  );
};

export default ImgModal;
