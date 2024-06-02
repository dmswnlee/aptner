"use client";
import React, { useRef } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import UserEdit from "../_component/UserEdit";

export default function MyPassword() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0">
          <UserEdit />
        </div>
        <div className="w-[586px] relative ">
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
