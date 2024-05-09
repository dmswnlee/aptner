import { IoClose } from "react-icons/io5";
import ColorButton from "../buttons/ColorButton";

interface modalProps {
	text: string;
}

const Modal = ({ text }: modalProps) => {
	return (
		<div className="w-full h-full flex justify-center items-center z-10 fixed top-0 left-0 bg-black bg-opacity-50">
			<div className="relative w-[598px] h-[335px] bg-white rounded-[5px] p-[45px] flex flex-col justify-between items-center">
				<div className="mt-[75px]">{text}</div>
				<ColorButton text="확인" size="md" />
				<div className="absolute top-5 right-5">
					<IoClose className="text-2xl" />
				</div>
			</div>
		</div>
	);
};

export default Modal;
