import React, { useRef, useState } from "react";
import Button from "@/components/buttons/Button";
import User from "../../../assets/images/emoji/user.png";

interface ImgModalProps {
  onClose: () => void;
  onImageSelect: (file: File) => void;
  profileImage: string | undefined;
}

const ImgModal: React.FC<ImgModalProps> = ({
  onClose,
  onImageSelect,
  profileImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.preventDefault();
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // 선택된 이미지의 미리보기 URL 생성
      console.log("Selected file in ImgModal:", file); // 콘솔에 파일 출력
      onImageSelect(file); // 파일을 부모 컴포넌트로 전달
    }
  };

  const handleDelete = () => {
    setSelectedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // 기본 이미지 파일을 Blob으로 생성하여 전달
    fetch(User.src)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "default_profile.png", {
          type: "image/png",
        });
        onImageSelect(defaultFile); // 기본 이미지 파일을 부모 컴포넌트로 전달
      });
  };

  return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[720px] h-[520px] flex flex-col rounded-[8px] relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
        <input
          ref={fileInputRef}
          className="hidden"
          id="userImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange} // 파일 선택 시 핸들러 호출
        />
        <div className="mx-auto flex flex-col items-center">
          <p className="font-semibold text-[20px] mt-[64px] mb-[72px]">
            프로필사진 수정
          </p>

          <div className="w-[80px] h-[80px] mb-10 rounded-full border-2 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={selectedImage || profileImage || User.src}
                alt="Selected"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src={profileImage || User.src}
                alt="Selected"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex gap-[13px] mb-[34px]">
            <Button
              text="사진 선택"
              className="w-[76px] h-[38px] text-[16px] leading-[18px] py-[6px] bg-[#fafafa] text-[#5f5f5f] hover:text-[#00A8FF] hover:bg-[#EBF7FF]"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            />
            <Button
              text="사진 삭제"
              className="w-[76px] h-[38px] text-[16px] leading-[18px] py-[6px] bg-[#fafafa] text-[#5f5f5f] hover:text-[#00A8FF] hover:bg-[#EBF7FF]"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            />
          </div>
        </div>
        <Button
          text="사진 적용하기"
          className="w-[100px] mx-auto h-[32px] text-[16px] leading-[18px] py-[6px] bg-[#EEE] text-black_100 hover:text-[#00A8FF] hover:bg-[#EBF7FF]"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default ImgModal;
