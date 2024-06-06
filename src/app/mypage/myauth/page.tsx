"use client";
import React, { useState } from "react";
import UserEdit from "../_component/UserEdit";
import AuthModal from "../_component/AuthModal";

export default function MyAuth() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-[-30px]">
          <UserEdit />
        </div>
        <div className="w-[586px] relative">
          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label>이름</label>
            <div className="flex flex-col h-[56px]">
              <input
                type="text"
                placeholder="패스트캠퍼스"
                className="border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label>휴대폰 번호</label>
            <div className="flex flex-col h-[56px]">
              <input
                type="text"
                placeholder="패스트캠퍼스"
                className="border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4 mt-[88px] mb-[76px]">
          <button
            type="button"
            className="py-4 px-5 w-[430px] rounded-[5px] bg-blue_05 text-white cursor-pointer"
            onClick={openAuthModal}
          >
            변경하기
          </button>
        </div>
      </div>
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
    </>
  );
}
