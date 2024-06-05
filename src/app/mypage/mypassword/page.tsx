"use client";
import React from "react";
import Button from "@/components/buttons/Button";
import UserEdit from "../_component/UserEdit";
import { useForm } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";

interface FormData {
  currentPassword: string;
}

export default function MyPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    mode: "onBlur",
  });
  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-0">
          <UserEdit />
        </div>
        <div className="w-[586px] flex flex-col gap-10  relative ">
          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label htmlFor="nickname">현재 비밀번호</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("currentPassword", {
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
                id="currentPassword"
                type="text"
                placeholder="패스트캠퍼스"
                onBlur={() => trigger("currentPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.currentPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red">
                    {errors.currentPassword.type === "pattern"
                      ? "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다."
                      : errors.currentPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label htmlFor="nickname">현재 비밀번호</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("currentPassword", {
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
                id="currentPassword"
                type="text"
                placeholder="패스트캠퍼스"
                onBlur={() => trigger("currentPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.currentPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red">
                    {errors.currentPassword.type === "pattern"
                      ? "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다."
                      : errors.currentPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label htmlFor="nickname">현재 비밀번호</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("currentPassword", {
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
                id="currentPassword"
                type="text"
                placeholder="패스트캠퍼스"
                onBlur={() => trigger("currentPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.currentPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red">
                    {errors.currentPassword.type === "pattern"
                      ? "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다."
                      : errors.currentPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <Button
            text="탈퇴하기"
            className="absolute right-0 bottom-[-70px] underline underline-offset-2 border-none text-gray_07 font-normal"
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
