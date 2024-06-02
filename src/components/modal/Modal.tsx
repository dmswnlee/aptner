import { IoClose } from "react-icons/io5";
import ColorButton from "../buttons/ColorButton";

interface modalProps {
  text: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal = ({ text, onClose, onConfirm }: modalProps) => {
  // '확인' 버튼 클릭 핸들러
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
      className="w-full h-full flex justify-center items-center z-40 fixed top-0 left-0 bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative w-[598px] h-[335px] bg-white rounded-[5px] p-[45px] flex flex-col justify-between items-center"
        onClick={stopPropagation}
      >
        <div className="mt-[75px]">{text}</div>
        <ColorButton text="확인" size="md" onClick={handleConfirm} />
        <div className="absolute top-5 right-5" onClick={onClose}>
          <IoClose className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
