import { IoClose } from "react-icons/io5";
import ColorButton from "../buttons/ColorButton";

interface ModalProps {
  text: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ text, onClose, onConfirm }) => {
  // 'Confirm' 버튼 클릭 핸들러
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 전달된 함수 실행
    } else {
      onClose(); // 전달된 함수가 없으면 모달 닫기
    }
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
          <button
            onClick={onClose}
            className="w-[214px] h-[56px] bg-[#EEE] text-black_100 rounded-[5px]"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="w-[214px] h-[56px] bg-blue_05 text-white rounded-[5px]"
          >
            확인
          </button>
        </div>
        <div className="absolute top-5 right-5" onClick={onClose}>
          <IoClose className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
