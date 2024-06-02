import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import Modal from "@/components/modal/Modal";
import { getErrorMessage, inputStyle } from "@/app/signup/_component/IdentityVerification";

const phoneNumberRegex = /^\d{1,11}$/;
const verificationCodeRegex = /^\d{6}$/;

const PasswordForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [showVerificationInput, setShowVerificationInput] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number | null>(179);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [isExpired, setIsExpired] = useState(false);

	const id = watch("id", "");
	const name = watch("name", "");
	const phone = watch("phone", "");
	const code = watch("code", "");

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (timeLeft !== null) {
			timer = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime !== null && prevTime > 0) {
						return prevTime - 1;
					} else {
						setIsExpired(true);
						clearInterval(timer);
						return 0;
					}
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [timeLeft]);

	const handleClickRequest = () => {
		if (!phoneNumberRegex.test(phone)) {
			setModalMessage("핸드폰 번호 형식이 올바르지 않습니다.");
			setIsModalOpen(true);
			return;
		}

		setTimeLeft(179);
		setShowVerificationInput(true);
		setIsDisabled(true);
	};

	const onSubmit = () => {
		if (!id) {
			setModalMessage("아이디를 입력해주세요");
			setIsModalOpen(true);
			return;
		}
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
		if (!code) {
			setModalMessage("인증을 완료해 주세요");
			setIsModalOpen(true);
			return;
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		clearErrors();
	};

	const formatTime = (seconds: number | null) => {
		if (seconds === null) return "00:00";
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
	};

	return (
		<>
			<form className="flex flex-col gap-[10px] mt-[80px]" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-[10px]">
					<p className="w-[120px] p-[10px]">아이디</p>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							placeholder="아이디 입력"
							className={`${inputStyle} px-[30px] w-[430px] h-[48px]`}
							{...register("id")}
							disabled={isDisabled}
						/>
					</div>
				</div>
				<div className="flex gap-[10px]">
					<p className="w-[120px] p-[10px]">이름</p>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							placeholder="이름 입력"
							className={`${inputStyle} px-[30px] w-[430px] h-[48px]`}
							{...register("name")}
							disabled={isDisabled}
						/>
					</div>
				</div>
				<div className="flex gap-[10px]">
					<p className="w-[120px] p-[10px]">휴대폰 번호</p>
					<div className="flex flex-col gap-2 grow">
						<input
							type="text"
							placeholder="-없이 입력"
							className={`${inputStyle} px-[30px] h-[48px]`}
							{...register("phone")}
							disabled={isDisabled}
						/>
					</div>
					<div className="shrink">
						<SmallBorderButton
							text={showVerificationInput ? "재전송" : "인증번호 요청"}
							size="sm"
							onClick={handleClickRequest}
						/>
					</div>
				</div>
				{showVerificationInput && (
					<div className="flex gap-[10px] ml-[130px]">
						<div className="flex flex-col gap-2 grow">
							<div className="relative">
								<input
									type="text"
									placeholder="인증번호를 입력하세요"
									className={`${inputStyle} w-[359px] h-[48px] px-[30px]`}
								/>
								<span
									className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
										timeLeft === 0 ? "text-red" : "text-gray-500"
									}`}>
									{formatTime(timeLeft)}
								</span>
							</div>
						</div>
						<SmallBorderButton text="확인" size="sm" />
					</div>
				)}
				<div className="flex justify-center mt-[56px]">
					<ColorButton text="비밀번호 조회하기" size="lg" />
				</div>
			</form>
			{isModalOpen && <Modal text={modalMessage} onClose={closeModal} />}
		</>
	);
};

export default PasswordForm;
