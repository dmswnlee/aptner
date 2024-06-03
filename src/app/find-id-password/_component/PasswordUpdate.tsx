import { inputStyle } from "@/app/signup/_component/IdentityVerification";
import ColorButton from "@/components/buttons/ColorButton";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PasswordUpdate = () => {
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const validatePassword = (pwd: string) => {
		const hasLetter = /[a-zA-Z]/.test(pwd);
		const hasNumber = /[0-9]/.test(pwd);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
		const isValidLength = pwd.length >= 8 && pwd.length <= 20;
		const hasValidChars = Number(hasLetter) + Number(hasNumber) + Number(hasSpecialChar) >= 2;
		const noRepeatedChars = !/(.)\1\1/.test(pwd);

		return isValidLength && hasValidChars && noRepeatedChars;
	};

	const password = watch("password", "");
	const newPassword = watch("newPassword", "");

	const onSubmit = () => {
		if (!password) {
			setModalMessage("비밀번호를 입력해 주세요.");
			setIsModalOpen(true);
			return;
		}
		if (!newPassword) {
			setModalMessage("새 비밀번호를 입력해 주세요.");
			setIsModalOpen(true);
			return;
		}
		if (password !== newPassword) {
			setModalMessage("비밀번호가 일치하지 않습니다.");
			setIsModalOpen(true);
			return;
		}
		if (!validatePassword(password) || !validatePassword(newPassword)) {
			setModalMessage("올바른 비밀번호가 아닙니다.");
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
				<p className="w-[130px] p-[10px]">새 비밀번호</p>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="비밀번호 입력"
						className={`${inputStyle} px-[30px] w-[420px] h-[48px]`}
						{...register("password")}
					/>
				</div>
			</div>
			<div className="flex gap-[10px]">
				<p className="w-[130px] p-[10px]">새 비밀번호 확인</p>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="새 비밀번호 입력"
						className={`${inputStyle} px-[30px] w-[420px] h-[48px]`}
						{...register("newPassword")}
					/>
				</div>
			</div>
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="비밀번호 재설정 완료" size="lg" />
			</div>
			{isModalOpen && <Modal text={modalMessage} onClose={closeModal} />}
		</form>
	);
};

export default PasswordUpdate;
