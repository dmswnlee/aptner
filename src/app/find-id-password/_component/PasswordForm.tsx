import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import Modal from "@/components/modal/Modal";
import { inputStyle } from "@/app/signup/_component/IdentityVerification";
import PasswordUpdate from "./PasswordUpdate";
import { RootState } from "@/stores/store";
import { clearMessages, fetchPasswordRequest, fetchUserInfoRequest } from "@/stores/slice/passwordSlice";
import { sendVerificationRequest, setVerificationExpired, verifyCodeRequest } from "@/stores/slice/verificationSlice";

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
	const dispatch = useDispatch();
	const [showUpdatePassword, setShowUpdatePassword] = useState(false);
	const { error, successMessage } = useSelector((state: RootState) => state.findPassword);
	const {
		isVerified,
		verificationCode,
		error: verificationError,
	} = useSelector((state: RootState) => state.verification);

	const email = watch("email", "");
	const name = watch("name", "");
	const phone = watch("phone", "");
	const code = watch("verificationCode", "");
	const phoneNumber = watch("phone");

	useEffect(() => {
		if (isVerified) {
			setShowVerificationInput(false);
			setModalMessage("인증이 완료되었습니다.");
			setIsModalOpen(true);
		}
	}, [isVerified]);

	useEffect(() => {
		if (verificationError) {
			setModalMessage("인증번호가 다릅니다.");
			setIsModalOpen(true);
		}
	}, [verificationError]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (timeLeft !== null) {
			timer = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime !== null && prevTime > 0) {
						return prevTime - 1;
					} else {
						dispatch(setVerificationExpired());
						clearInterval(timer);
						setModalMessage("인증시간을 초과하였습니다.");
						setIsModalOpen(true);
						return 0;
					}
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [timeLeft, dispatch]);

	const onSubmit = () => {
		if (!email) {
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
		if (!code && showVerificationInput) {
			setModalMessage("인증을 완료해 주세요");
			setIsModalOpen(true);
			return;
		}
		dispatch(fetchUserInfoRequest({ email, name, phone }));

		// if (successMessage) {
		// 	setShowUpdatePassword(true);
		// }
	};

	useEffect(() => {
		if (successMessage === "회원정보가 확인되었습니다.") {
			setShowUpdatePassword(true);
		}
	}, [successMessage]);

	const handleClickRequest = () => {
		if (!phoneNumberRegex.test(phone)) {
			setModalMessage("핸드폰 번호 형식이 올바르지 않습니다.");
			setIsModalOpen(true);
			return;
		}

		if (phoneNumber) {
			dispatch(sendVerificationRequest({ phoneNumber }));
			setTimeLeft(179);
			setShowVerificationInput(true);
			setIsDisabled(true);
		}
	};

	const handleVerifyCode = () => {
		if (!code) {
			setModalMessage("인증을 완료해 주세요");
			setIsModalOpen(true);
			return;
		}

		const verificationData = {
			phoneNumber: phone,
			code,
		};

		dispatch(verifyCodeRequest(verificationData));
	};

	const closeModal = () => {
		setIsModalOpen(false);
		clearErrors();
	};

	useEffect(() => {
		if (error) {
			setModalMessage(error);
			setIsModalOpen(true);
			dispatch(clearMessages());
		}
		if (successMessage) {
			setModalMessage(successMessage);
			setIsModalOpen(true);
			dispatch(clearMessages());
		}
	}, [error, successMessage, dispatch]);

	const formatTime = (seconds: number | null) => {
		if (seconds === null) return "00:00";
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
	};

	if (showUpdatePassword) {
		return <PasswordUpdate email={email} name={name} phone={phone} verificationCode={code} />;
	}

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
							{...register("email")}
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
									className={`${inputStyle} w-[358px] h-[48px] px-[30px]`}
									{...register("verificationCode")}
								/>
								<span
									className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500
									`}>
									{formatTime(timeLeft)}
								</span>
							</div>
						</div>
						<SmallBorderButton text="확인" size="sm" onClick={handleSubmit(handleVerifyCode)} />
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
