"use client";
import React, { useState } from "react";
import UserEdit from "../_component/UserEdit";
import { useForm } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";
import axios from "axios";
import { useSession } from "next-auth/react";
import ConfirmModal from "../../../components/modal/ConfirmModal";

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function MyPassword() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  const openConfirmModal = () => setIsConfirmModalOpen(true);

  const handlePassword = async (data: FormData) => {
    try {
      const requestPayload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };
      console.log(requestPayload);
      const response = await axios.patch(
        "https://aptner.site/v1/api/members/my-pages/password",
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setIsConfirmModalOpen(false);
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit(openConfirmModal)}>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-[-30px]">
          <UserEdit />
        </div>
        <div className="w-[586px] flex flex-col gap-10 relative ">
          <div className="flex justify-between items-center h-12 text-normal">
            <label htmlFor="currentPassword">현재 비밀번호</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("currentPassword", {
                  required: "비밀번호는 8~20자리여야 합니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8~20자리여야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 8~20자리여야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                    message:
                      "비밀번호는 영어, 숫자, 특수문자를 사용하여 8~20자리여야 합니다.",
                  },
                })}
                id="currentPassword"
                type="password"
                autoComplete="off"
                placeholder=" "
                onBlur={() => trigger("currentPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.currentPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red text-[14px]">
                    {errors.currentPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 h-12 text-normal">
            <label htmlFor="newPassword">새 비밀번호</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("newPassword", {
                  required: "비밀번호는 8~20자리여야 합니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8~20자리여야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 8~20자리여야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                    message:
                      "비밀번호는 영어, 숫자, 특수문자를 사용하여 8~20자리여야 합니다.",
                  },
                })}
                id="newPassword"
                type="password"
                autoComplete="off"
                onBlur={() => trigger("newPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.newPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.newPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red text-[14px]">
                    {errors.newPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 h-12 text-normal">
            <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                {...register("confirmNewPassword", {
                  required: "비밀번호 확인은 필수 항목입니다.",
                  validate: (value) =>
                    value === newPassword || "비밀번호가 일치하지 않습니다.",
                })}
                id="confirmNewPassword"
                type="password"
                autoComplete="off"
                onBlur={() => trigger("confirmNewPassword")}
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.confirmNewPassword ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.confirmNewPassword && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red text-[14px]">
                    {errors.confirmNewPassword.message}
                  </p>
                  <LuAlertCircle className="text-red absolute bottom-5 right-[30px]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4 mt-10 mb-[76px]">
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
      {isConfirmModalOpen && (
        <ConfirmModal
          text="현재 상태로 수정하시겠습니까?"
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleSubmit(handlePassword)}
        />
      )}
    </form>
  );
}
