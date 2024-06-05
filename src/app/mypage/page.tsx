"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import UserEdit from "./_component/UserEdit";
import { LuAlertCircle } from "react-icons/lu";
import Image from "next/image";
import ImgModal from "./_component/ImgModal";
import ConfirmModal from "../../components/modal/ConfirmModal";

interface FormData {
  nickname: string;
}

export default function MyPage() {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsConfirmModalOpen(true); // 폼 제출 시 컨펌 모달 열기
  };

  const openImgModal = () => {
    setIsImgModalOpen(true);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const confirmSubmit = () => {
    setIsConfirmModalOpen(false);
    // 추가 작업을 여기에 수행할 수 있습니다. 예: API 호출
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-[-20px]">
          <UserEdit />
        </div>
        <div className="w-[560px] relative">
          <div className="h-[122px] w-[103px] mx-auto flex flex-col items-center">
            <Image
              src="/"
              alt="userimage"
              width={80}
              height={80}
              className="rounded-full border-2 cursor-pointer"
            />
            <Button
              text="사진 변경하기"
              className="mt-3 w-full text-[16px] leading-[18px] py-[6px] border-blue_05 text-blue_05"
              onClick={openImgModal}
            />
          </div>

          <div className="flex text-normal justify-between items-center h-12 mt-10">
            <p>아이디</p>
            <p className="w-[428px] ml-[10px] px-[30px] py-[15px]">
              fastcampus
            </p>
          </div>

          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label htmlFor="nickname">닉네임</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("nickname", {
                  required: "닉네임은 2~20자 이내로 입력해 주세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2~20자 이내로 입력해 주세요.",
                  },
                  maxLength: {
                    value: 20,
                    message: "닉네임은 2~20자 이내로 입력해 주세요.",
                  },
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9_]+$/,
                    message:
                      "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다.",
                  },
                })}
                id="nickname"
                type="text"
                placeholder="패스트캠퍼스"
                onBlur={() => trigger("nickname")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.nickname ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.nickname && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red">
                    {errors.nickname.type === "pattern"
                      ? "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다."
                      : errors.nickname.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <Button
            text="탈퇴하기"
            className="absolute right-0 underline underline-offset-2 border-none text-gray_07 font-normal mt-[56px]"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4 mt-[88px] mb-[76px]">
        <button
          type="submit"
          className={`py-4 px-5 w-[430px] rounded-[5px] ${
            isValid
              ? "bg-blue_05 text-white cursor-pointer"
              : "bg-gray_05 text-gray_600 cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          수정하기
        </button>
      </div>

      {isImgModalOpen && <ImgModal onClose={closeImgModal} />}
      {isConfirmModalOpen && (
        <ConfirmModal
          text="현재 상태로 수정하시겠습니까?"
          onClose={closeConfirmModal}
          onConfirm={confirmSubmit}
        />
      )}
    </form>
  );
}
