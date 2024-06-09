import { IoClose } from "react-icons/io5";
import Button from "@/components/buttons/Button";

interface ModalProps {
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ text, onClose, onConfirm }) => {
  // 'Confirm' 버튼 클릭 핸들러
  const handleConfirm = () => {
    onConfirm(); // 전달된 함수 실행
  };

  // 모달 내부 클릭 시 이벤트 전파 방지
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 모달 배경 클릭 시 모달 닫기
  const handleBackgroundClick = () => {
    onClose();
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center z-50 fixed top-0 left-0 bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative w-[736px] h-[240px] bg-white rounded-[5px] px-[45px] flex flex-col items-center"
        onClick={stopPropagation}
      >
        <div className="mt-[75px] mb-[48px] font-semibold">{text}</div>
        <div className="flex gap-4">
          <Button
            text="취소"
            className="w-[214px] h-[56px] bg-[#EEE] text-black_100 rounded-[5px]"
            onClick={onClose}
          />
          <Button
            text="확인"
            className="w-[214px] h-[56px] bg-blue_05 text-white rounded-[5px]"
            onClick={handleConfirm}
          />
        </div>
        <div className="absolute top-5 right-5" onClick={onClose}>
          <IoClose className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
