"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import Button from "@/components/buttons/Button";
import UserEdit from "./_component/UserEdit";
import ImgModal from "./_component/ImgModal";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { IoClose } from "react-icons/io5";

interface FormData {
  nickname: string;
}

export default function MyPage() {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(user?.profileImage || null);
    }
  }, [selectedFile, user?.profileImage]);

  useEffect(() => {
    if (user?.nickname) {
      setValue("nickname", user.nickname);
    }
  }, [user, setValue]);

  const openImgModal = () => {
    setIsImgModalOpen(true);
  };

  const closeImgModal = () => setIsImgModalOpen(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file in MyPage:", file); // 콘솔에 파일 출력
    closeImgModal(); // 이미지 선택 후 모달 닫기
  };

  const openConfirmModal = () => setIsConfirmModalOpen(true);

  const confirmSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }
    //콘솔 데이터 로그임
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0] + ": " + (pair[1] as File).name);
      } else {
        console.log(pair[0] + ": " + pair[1]);
      }
    }

    try {
      const response = await axios.patch(
        "https://aptner.site/v1/api/members/my-pages/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.result);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(openConfirmModal)}>
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0 top-[-30px]">
          <UserEdit />
        </div>
        <div className="w-[560px] relative">
          <div className="h-[122px] w-[103px] mx-auto flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="rounded-full border-2 cursor-pointer w-[80px] h-[80px] object-cover"
                onClick={openImgModal}
              />
            ) : (
              <div
                className="w-[80px] h-[80px] rounded-full border-2 cursor-pointer flex items-center justify-center"
                onClick={openImgModal}
              >
                <div className="text-gray-500">사진 선택</div>
              </div>
            )}
            <Button
              text="사진 변경하기"
              className="mt-3 w-full text-[16px] leading-[18px] py-[6px] border-blue_05 text-blue_05"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                openImgModal();
              }}
            />
          </div>
          <div className="flex text-normal justify-between items-center h-12 mt-10">
            <label htmlFor="id">아이디</label>
            <input
              id="email"
              type="text"
              className="w-[428px] ml-[10px] px-[30px] py-[15px] border bg-[#f7f7f7] rounded-[5px] text-black_100"
              placeholder={user?.email || "example@example.com"}
              disabled
            />
          </div>
          <div className="flex justify-between items-center h-12 mt-[30px] text-normal">
            <label htmlFor="nickname">닉네임</label>
            <div className="flex flex-col h-[56px] relative">
              <input
                id="nickname"
                type="text"
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
                className={`border bg-[#fcfcfc] rounded-[5px] w-[428px] pl-[30px] pr-[60px] py-[15px] outline-none ${
                  errors.nickname ? "border-red" : "border-gray-300"
                }`}
              />
              {errors.nickname && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-red text-[14px]">
                    {errors.nickname.type === "pattern"
                      ? "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능합니다."
                      : errors.nickname.message}
                  </p>
                  <IoClose className="text-red absolute bottom-5 right-[30px]" />
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
          className={`py-4 px-5 w-[430px] rounded-[5px] ${
            isValid || selectedFile
              ? "bg-blue_05 text-white cursor-pointer"
              : "bg-gray_05 text-gray_600 cursor-not-allowed"
          }`}
          disabled={!isValid && !selectedFile}
        >
          수정하기
        </button>
      </div>
      {isImgModalOpen && (
        <ImgModal onClose={closeImgModal} onImageSelect={handleImageSelect} />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          text="현재 상태로 수정하시겠습니까?"
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleSubmit(confirmSubmit)}
        />
      )}
    </form>
  );
}
