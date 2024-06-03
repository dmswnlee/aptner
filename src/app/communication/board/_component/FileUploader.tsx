import React, { useRef, useState } from "react";
import { GoFileDirectory } from "react-icons/go";
import { IoClose} from "react-icons/io5";
import { IoMdInformationCircleOutline } from"react-icons/io"
import { HiOutlineFolderPlus } from "react-icons/hi2";

// 파일 업로더 컴포넌트의 속성 타입 정의
interface FileUploaderProps {
  fileNames: string[];
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ fileNames, setFileNames }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 파일이 변경되었을 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).map((file) => file.name);
      setFileNames((prevFileNames) => [...prevFileNames, ...files]);
    }
  };

  // 파일을 제거하는 함수
  const handleRemoveFile = (fileName: string) => {
    setFileNames((currentFileNames) => currentFileNames.filter((name) => name !== fileName));
  };

  return (
    <div>
      {/* 파일 첨부 및 정보 아이콘 영역 */}
      <div className="flex justify-between border-t mt-4">
        <div className="flex items-center gap-2">
          <label>
            {/* 파일 입력 요소 (숨김 처리됨) */}
            <input
              type="file"
              ref={fileInput}
              onChange={handleChange}
              multiple
              className="hidden"
            />
            {/* 파일 첨부 버튼 */}
            <div className="flex items-center gap-2 cursor-pointer mt-4 px-[11px] py-[10px] w-[145px] border rounded-[5px] leading-normal text-[#222]">
              <GoFileDirectory />
              파일 첨부하기
            </div>
          </label>
          {/* 정보 아이콘 및 툴팁 */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <IoMdInformationCircleOutline className="text-[20px] mt-4 cursor-pointer" />
            {isHovered && (
              <div className="absolute top-0 left-0 w-[682px] p-[10px] bg-white border rounded-[5px] shadow-xl z-10 tooltip">
                <div className="flex gap-2">
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
      </div>

      {/* 파일 목록 표시 */}
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
        // 파일이 없는 경우 표시되는 영역
        <div className="flex justify-center gap-1 text-[#666] bg-[#fcfcfc] items-center h-20 border rounded-[5px] mt-4">
          <HiOutlineFolderPlus className="text-xl" />
          파일을 첨부해 주세요.
        </div>
      )}
    </div>
  );
};

export default FileUploader;
