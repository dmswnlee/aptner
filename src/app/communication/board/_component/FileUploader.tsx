import React, { useRef, useState } from "react";

import { GoFileDirectory } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import { FileUploadProps } from '@/interfaces/communication/FileUploader';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILE_COUNT = 20;
const allowedExtensions = [
  "hwp", "doc", "docx", "xls", "ppt", "pptx", "pdf", "jpg",
  "jpeg", "png", "gif", "bmp", "mov", "avi", "mpg", "3gp",
  "3g2", "midi", "mid", "mp3", "mp4", "webm", "wmv",
];

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, handleRemoveFile }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      let validFiles = selectedFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        const isValidExtension = extension && allowedExtensions.includes(extension);
        const isValidSize = file.size <= MAX_FILE_SIZE;

        if (!isValidExtension) {
          alert(`${file.name} 파일은 허용되지 않는 확장자입니다.`);
        }
        if (!isValidSize) {
          alert(`${file.name} 파일의 크기가 10MB를 초과합니다.`);
        }

        return isValidExtension && isValidSize;
      });

      const totalFiles = files.length + validFiles.length;
      if (totalFiles > MAX_FILE_COUNT) {
        alert(`파일은 최대 ${MAX_FILE_COUNT}개까지 첨부할 수 있습니다.`);
        validFiles = validFiles.slice(0, MAX_FILE_COUNT - files.length);
      }

      const fileInfos = validFiles.map((file) => ({
        id: Date.now(),
        name: file.name,
        path: URL.createObjectURL(file),
        size: file.size,
        file: file,
      }));

      setFiles((prevFiles) => [...prevFiles, ...fileInfos]);
    }
  };

  return (
    <div>
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
      <div className="mt-4">
        {files.length > 0 ? (
          <div className="border rounded-[5px]">
            <p className="bg-[#f7f7f7] h-10 flex text-[#666]">
              <div className="px-4 py-2">
                <IoClose className="text-2xl" />
              </div>
              <p className="px-4 py-2">파일명</p>
            </p>
            <div className="flex flex-col text-[#666] border-t bg-gray_00 max-h-[120px] overflow-y-scroll custom-scrollbar">
              {files.map((file, index) => (
                <div key={index} className="inline-flex w-fit items-center">
                  <button
                    onClick={() => handleRemoveFile(file.name)}
                    className="text-2xl px-4 py-2"
                    type="button"
                  >
                    <IoClose />
                  </button>
                  <p className="px-4 py-2 w-[500px] truncate flex-shrink-0">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-1 text-[#666] bg-[#fcfcfc] items-center h-20 border rounded-[5px]">
            <HiOutlineFolderPlus className="text-xl" />
            파일을 첨부해 주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
