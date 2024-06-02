import { useForm } from "react-hook-form";
import ColorButton from "@/components/buttons/ColorButton";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { inputStyle } from "@/app/signup/_component/IdentityVerification";

const phoneNumberRegex = /^\d{1,11}$/;

const IdForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const name = watch("name", "");
	const phone = watch("phone", "");

	const onSubmit = () => {
		if (!name) {
			setModalMessage("이름을 입력해주세요");
			setIsModalOpen(true);
			return;
		}
		if (!phone) {
			setModalMessage("휴대폰 번호를 입력해주세요");
			setIsModalOpen(true);
			return;
		}
		if (!phoneNumberRegex.test(phone)) {
			setModalMessage("핸드폰 번호 형식이 올바르지 않습니다.");
			setIsModalOpen(true);
			return;
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		clearErrors();
	};

	return (
		<form className="flex flex-col gap-[10px] mt-[80px]" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex gap-[10px]">
				<p className="w-[120px] p-[10px]">이름</p>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="이름 입력"
						className={`${inputStyle} px-[30px] w-[430px] h-[48px]`}
						{...register("name")}
					/>
				</div>
			</div>
			<div className="flex gap-[10px]">
				<p className="w-[120px] p-[10px]">휴대폰 번호</p>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="-없이 입력"
						className={`${inputStyle} px-[30px] w-[430px] h-[48px]`}
						{...register("phone")}
					/>
				</div>
			</div>
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="아이디 찾기" size="lg" />
			</div>
			{isModalOpen && <Modal text={modalMessage} onClose={closeModal} />}
		</form>
	);
};

export default IdForm;
