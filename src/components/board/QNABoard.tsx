"use client";
import React, { useRef, useState } from "react";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import { GoFileDirectory } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import TinyEditor from "./TinyEditor";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Option {
  label: string;
}

interface BoardProps {
  options: Option[];
}

interface FormData {
  categoryCode: string;
  title: string;
  content: string;
  isPrivate: boolean;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export default function Board({ options }: BoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [editorContent, setEditorContent] = useState<string>("");
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const handleCancel = () => {
    router.back();
  };
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setValue("categoryCode", option);
    setIsOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      const newFileNames = Array.from(files).map((file) => file.name);
      setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
    }
  };
  const handleRemoveFile = (fileName: string) => {
    setFileNames((currentFileNames) =>
      currentFileNames.filter((name) => name !== fileName)
    );
  };

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      categoryCode: options[0].label,
      isPrivate: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    const categoryIndex =
      options.findIndex((option) => option.label === selectedOption) + 1;
    const categoryCode = `QA${String(categoryIndex).padStart(3, "0")}`;

    const jsonPayload = {
      categoryCode: categoryCode,
      title: data.title,
      content: editorContent,
      isPrivate: data.isPrivate,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(jsonPayload)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "https://aptner.site/v1/api/qna/RO000",
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server Response:", response.data);
      const qnaId = response.data.result.qnaId;
      router.push(`/complaints/detail/${qnaId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col relative border rounded-[5px] p-5 border-gray_05">
        {/* Dropdown for category selection */}
        <div>
          <button
            className="pb-[15px] text-left flex items-center gap-[10px]"
            onClick={toggleDropdown}
            type="button"
          >
            {selectedOption}
            <IoIosArrowDown />
          </button>
          {isOpen && (
            <ul
              className="absolute px-5 py-2 left-0 ml-[11px] mt-[-10px] bg-white border rounded-sm"
              style={{ boxShadow: "0px 3px 8px 0px rgba(0, 0, 0, 0.24)" }}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption(option.label)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          className="px-[18px] py-[15px] rounded-[5px] border text-[16px] placeholder:text-[16px] placeholder:text-gray_06 focus:border-gray_05 outline-gray_05 leading-[18px]"
          {...register("title")}
          type="text"
          placeholder="제목을 입력하세요"
        />

        <div className="flex justify-between border-t mt-4">
          <div className="flex items-center gap-2">
            <label>
              <input
                type="file"
                ref={fileInput}
                onChange={handleChange}
                multiple
                className="hidden"
              />
              <div className="flex items-center gap-2 cursor-pointer mt-4 px-[11px] py-[10px] w-[145px] border rounded-[5px] leading-normal text-[#222]">
                <GoFileDirectory />
                파일 첨부하기
              </div>
            </label>
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <IoMdInformationCircleOutline className="text-[20px] mt-4 cursor-pointer" />
              {isHovered && (
                <div className="absolute top-0 left-0 w-[682px] p-[10px] bg-white border rounded-[5px] shadow-xl z-10 tooltip">
                  <div className="flex ] gap-2">
                    <IoMdInformationCircleOutline className="text-[20px] mt-[2px]" />
                    <p className="leading-normal">
                      허용 확장자 : HWP, DOC, DOCX, XLS, PPT, PPTX, PDF, JPG,
                      JPEG, PNG, GIF, BMP, MOV,
                      <br />
                      AVI, MPG, 3GP, 3G2, MIDI, MID, MP3, MP4, WebM, WMV
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <label className="flex gap-2 items-center">
            <input
              {...register("isPrivate")}
              type="checkbox"
              className="w-5 h-5"
            />
            비밀글
          </label>
        </div>
        {/* Displaying list of files with an option to remove */}
        {fileNames.length > 0 ? (
          <div className="border rounded-[5px] mt-4">
            <p className="bg-[#f7f7f7] h-10 flex text-[#666]">
              <div className="px-4 py-2">
                <IoClose className="text-2xl" />
              </div>
              <p className="px-4 py-2">파일명</p>
            </p>
            <div className="flex flex-col text-[#666] border-t bg-gray_00 max-h-[120px] overflow-y-scroll custom-scrollbar">
              {fileNames.map((name, index) => (
                <div key={index} className="inline-flex w-fit items-center">
                  <button
                    onClick={() => handleRemoveFile(name)}
                    className="text-2xl px-4 py-2"
                    type="button"
                  >
                    <IoClose />
                  </button>
                  <p className="px-4 py-2 w-[500px] truncate flex-shrink-0">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-1 text-[#666] bg-[#fcfcfc] items-center h-20 border rounded-[5px] mt-4">
            <HiOutlineFolderPlus className="text-xl" />
            파일을 첨부해 주세요.
          </div>
        )}

        {/* Legal warning message */}
        <div className="border-t mt-4 text-center font-xl leading-[18px] text-[#222]">
          <div className="mt-4 mb-[18px] py-[10px] border bg-[#f7f7f7]">
            <p className="flex justify-center items-center gap-1">
              <IoMdInformationCircleOutline className="text-[20px]" />
              게시글 작성시 욕설, 비방, 허위사실 유포 등의 내용이 포함되어 있을
              경우 명예훼손으로 법적 처벌이 이루어질 수 있습니다.
            </p>
            <p>서로의 의견을 경청하고 존중해 주세요.</p>
          </div>
        </div>

        <TinyEditor onChange={(content) => setEditorContent(content)} />
      </div>
      <div className="flex justify-center mt-10 gap-4">
        <Button
          text="취소"
          className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100"
          onClick={handleCancel}
        />
        <button
          type="submit"
          className="w-[108px] h-9 text-[14px] rounded-[5px] bg-[#EBF7FF] text-[#1674B7]"
        >
          작성
        </button>
      </div>
    </form>
  );
}
