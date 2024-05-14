"use client";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { GoFileDirectory } from "react-icons/go";
interface Option {
  label: string;
}

interface BoardProps {
  options: Option[]; // 옵션을 받기 위한 props
}
export default function Board({ options }: BoardProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.back(); // 브라우저의 히스토리에서 한 단계 뒤로 이동
  };

  return (
    <div className="flex flex-col">
      <select className="ml-[58px] w-[76px] mb-[18px]">
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        className="mx-[22px] px-[30px] py-[15px] rounded-[5px] bg-gray_00 border text-[20px] placeholder:text-[16px] focus:border-blue_05 focus:text-blue_05 outline-blue_05 leading-[18px]"
        type="text"
        placeholder="제목을 입력하세요"
      />
      <label className="w-[100px]">
        <span className="sr-only">파일 첨부하기</span>
        <input type="file" className="hidden" />
        <div className="flex items-center cursor-pointer mx-5 mt-4 p-[11px] w-[145px] border rounded-[5px] shadow-sm leading-normal font-normal text-gray_07">
          <GoFileDirectory className="mr-2" />
          파일 첨부하기
        </div>
      </label>

      <div className="border w-full my-6"></div>
      <textarea
        className="border mx-[22px] h-[278px] px-6 py-4 bg-gray_00 border-gray-300 rounded-[5px] focus:border-blue_05 focus:text-blue_05 outline-blue_05 focus:ring-opacity-50"
        placeholder="내용을 입력하세요."
      ></textarea>
      <div className="flex justify-center mt-[39px] gap-4 ">
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
    </div>
  );
}
