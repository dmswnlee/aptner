"use client";
import React, { useRef } from "react";

const UserImageUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="border-[1px] rounded-lg h-[118px]">
      <div className="h-[62px] mt-6 mx-6 flex">
        <input
          ref={fileInputRef}
          className="hidden"
          id="userImage"
          type="file"
          accept="image/*"
        />

        <div
          onClick={handleClick}
          className="w-[60px] h-[60px] rounded-full border-2 cursor-pointer"
        ></div>

        <div className="ml-3 text-[20px]">
          <p className="font-bold">Apartner UI 회원등급</p>
          <p>아크로리버뷰신반포</p>
        </div>
      </div>
    </div>
  );
};

export default UserImageUploader;
