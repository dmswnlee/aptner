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

interface Option {
  label: string;
}

interface BoardProps {
  options: Option[];
}

interface FormData {
  title: string;
  content: string;
  isPrivate: boolean;
  categoryCode: string;
}

export default function Board({ options }: BoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    router.back();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedOption(option);
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

  return (
    <>
      <form>
        <div className="flex flex-col relative border rounded-[5px] p-5 border-gray_05">
          {/* Dropdown for category selection */}
          <div>
            <button
              className="pb-[15px] text-left flex items-center gap-[10px]"
              onClick={toggleDropdown}
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
            className="px-[30px] py-[15px] rounded-[5px] bg-gray_00 border text-[16px] placeholder:text-[16px] placeholder:text-gray_06 focus:border-gray_05 outline-gray_05 leading-[18px]"
            type="text"
            placeholder="제목을 입력하세요"
          />

          <div className="flex justify-between">
            <label className="w-[100px]">
              <span className="sr-only">파일 첨부하기</span>
              <input
                type="file"
                ref={fileInput}
                onChange={handleChange}
                multiple
                className="hidden"
              />
              <div className="flex items-center font-[16px] cursor-pointer mt-4 p-[11px] w-[145px] border rounded-[5px] shadow-sm leading-normal text-[#222]">
                <GoFileDirectory className="mr-2" />
                파일 첨부하기
              </div>
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" className="w-5 h-5" />
              비밀글
            </label>
          </div>
          {/* Displaying list of files with an option to remove */}
          {fileNames.length > 0 ? (
            <div className="flex flex-col gap-3 py-3 text-[#666] bg-gray_00 max-h-[182px] rounded-[5px] mt-4 overflow-y-scroll custom-scrollbar">
              {fileNames.map((name, index) => (
                <div
                  key={index}
                  className="inline-flex w-fit items-center rounded-[5px] border p-[10px]"
                >
                  <p className="w-[120px] truncate flex-shrink-0">{name}</p>
                  <button
                    onClick={() => handleRemoveFile(name)}
                    className="text-2xl"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-1 text-[#666] items-center h-20 border rounded-[5px] mt-4">
              <HiOutlineFolderPlus className="text-xl" />
              파일을 첨부해 주세요.
            </div>
          )}

          {/* Legal warning message */}
          <div className="border-t mt-4 text-center font-xl leading-[18px] text-[#222]">
            <div className="mt-4 mb-[18px]">
              <p className="flex justify-center items-center gap-1">
                <IoMdInformationCircleOutline className="text-[20px]" />
                게시글 작성시 욕설, 비방, 허위사실 유포 등의 내용이 포함되어
                있을 경우 명예훼손으로 법적 처벌이 이루어질 수 있습니다.
              </p>
              <p>서로의 의견을 경청하고 존중해 주세요.</p>
            </div>
          </div>
          <TinyEditor />
        </div>
        <div className="flex justify-center mt-10 gap-4">
          <Button
            text="저장"
            className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100"
          />
          <Button
            text="취소"
            className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100"
            onClick={handleCancel}
          />
        </div>
      </form>
    </>
  );
}
