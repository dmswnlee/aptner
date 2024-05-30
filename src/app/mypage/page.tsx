"use client";
import React, { useRef } from "react";
import Button from "@/components/buttons/Button";
import Input from "../../components/Input/Input";
export default function MyPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <div className="ml-[21px] flex flex-col items-center">
        <div className="w-[586px] relative ">
          <input
            ref={fileInputRef}
            className="hidden"
            id="userImage"
            type="file"
            accept="image/*"
          />
          <div className="h-[122px] w-[103px] mx-auto flex flex-col items-center">
            <div
              onClick={handleClick}
              className="w-[80px] h-[80px] rounded-full border-2 cursor-pointer"
            ></div>
            <Button
              text="사진 변경하기"
              className="mt-3 w-full text-[16px] leading-[18px] py-[6px] border-blue_05 text-blue_05"
            />
          </div>

          <div className="flex justify-between items-center h-12 mt-10">
            <p className="text-[20px]">아이디</p>
            <p className="w-[428px] ml-[10px] pl-[30px]">fastcampus</p>
          </div>
          <Input
            id="password"
            label="현재 비밀번호"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="password"
            label="새 비밀번호"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="password"
            label="새 비밀번호 확인"
            type="text"
            placeholder="fastcampus_v1"
          />
          <Input
            id="phoneNumber"
            label="휴대폰 번호"
            type="text"
            placeholder="010-1234-5678"
          />
          <Input id="username" label="이름" type="text" placeholder="홍길동" />
          <Input
            id="username"
            label="닉네임"
            type="text"
            placeholder="패스트캠퍼스"
          />

          <Button
            text="탈퇴하기"
            className="absolute right-0 underline underline-offset-2 border-none text-gray_07 font-normal mt-[19px]"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4 mt-[88px] mb-[76px]">
        <Button
          text="수정하기"
          className="py-3 px-4 border-blue_05 text-blue_05"
        />
      </div>
    </>
  );
}
