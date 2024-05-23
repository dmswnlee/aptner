"use client";
import { useState } from "react";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { GoFileDirectory } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import ToastEditor from "./ToastEditor";

interface Option {
  label: string;
}

interface BoardProps {
  options: Option[]; // 옵션을 받기 위한 props
}

export default function Board({ options }: BoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const router = useRouter();

  const handleCancel = () => {
    router.back(); // 브라우저의 히스토리에서 한 단계 뒤로 이동
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col relative border rounded-[5px] p-5 border-gray_05">
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
          className="px-[30px] py-[15px] rounded-[5px] bg-gray_00 border text-[16px] placeholder:text-[16px] focus:border-gray_05 outline-gray_05 leading-[18px]"
          type="text"
          placeholder="제목을 입력하세요"
        />
        <label className="w-[100px]">
          <span className="sr-only">파일 첨부하기</span>
          <input type="file" className="hidden" />
          <div className="flex items-center font-[16px] cursor-pointer mt-4 p-[11px] w-[145px] border rounded-[5px] shadow-sm leading-normal text-[#222]">
            <GoFileDirectory className="mr-2" />
            파일 첨부하기
          </div>
        </label>

        <div className="border-t mt-4 text-center font-[16px] leading-[18px] text-[#222]">
          <p className="mt-4 mb-[18px]">
            게시글 작성시 욕설, 비방, 허위사실 유포 등의 내용이 포함되어 있을
            경우 명예훼손으로 법적 처벌이 이루어질 수 있습니다.
            <br />
            서로의 의견을 경청하고 존중해주시기 바랍니다.
          </p>
        </div>

        <ToastEditor />
      </div>
      <div className="flex justify-center mt-[39px] gap-4">
        <Button
          text="저장"
          className="w-[108px] p-[10px] border-blue_05 text-blue_05"
        />
        <Button
          text="취소"
          className="w-[108px] p-[10px] border-blue_05 text-blue_05"
          onClick={handleCancel}
        />
      </div>
    </>
  );
}
