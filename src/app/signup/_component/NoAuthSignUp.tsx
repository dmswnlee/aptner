import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	getErrorMessage,
	inputErrorStyle,
	inputStyle,
	nameRegex,
	phoneNumberRegex,
	verificationCodeRegex,
} from "./IdentityVerification";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setPersonalInfo } from "@/stores/slice/registrationSlice";
import { RootState } from "@/stores/store";
import { sendVerificationRequest, setVerificationExpired, verifyCodeRequest } from "@/stores/slice/verificationSlice";
import Modal from "@/components/modal/Modal";

const NoAuthSignUp = () => {
	const dispatch = useDispatch();
	const { isVerified, isExpired, verificationCode } = useSelector((state: RootState) => state.verification);
	const [showVerificationInput, setShowVerificationInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number | null>(179);
	const [verificationError, setVerificationError] = useState<string | null>(null);

	const {
		handleSubmit,
		formState: { errors, isValid },
		register,
		watch,
	} = useForm({
		mode: "onChange",
	});

	useEffect(() => {
		if (isVerified) {
			setShowVerificationInput(false);
			setIsModalOpen(true);
		}
	}, [isVerified]);

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
						return 0;
					}
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [timeLeft, dispatch]);

	const onSubmit = (data: any) => {
		dispatch(
			setPersonalInfo({
				name: data.name,
				idNumber: "",
				phoneNumber: data.phoneNumber,
				gender: "",
				carrier: "",
				verificationCode,
			}),
		);
		setShowVerificationInput(true);
		dispatch(nextStep());
		console.log(data);
	};

	const handleClickRequest = () => {
		const phoneNumber = watch("phoneNumber");
		if (phoneNumber) {
			dispatch(sendVerificationRequest({ phoneNumber }));
			setTimeLeft(179);
			setShowVerificationInput(true);
		}
	};

	const handleVerifyCode = (data: any) => {
		const response = dispatch(verifyCodeRequest({ phoneNumber: data.phoneNumber, code: data.verificationCode }));
		if (response.payload.isVerified) {
			setVerificationError(null);
		} else {
			setVerificationError("인증번호가 다릅니다.");
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const formatTime = (seconds: number | null) => {
		if (seconds === null) return "00:00";
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
	};

	return (
		<div className="flex justify-center">
			<div className="w-[648px] flex flex-col gap-10">
				<div className="border-b-2 border-solid border-[#000000] py-1">
					<h3 className="text-2xl font-semibold">본인인증 없이 회원가입</h3>
				</div>
				<div className="text-sm text-[#777777] font-bold">
					<p>휴대폰 본인인증이 불가능한 경우, 휴대폰 소유여부만 확인하고 회원가입을 할 수 있습니다.</p>
					<p>단, 투표 시 모바일 전자투표 참여가 어려울 수 있습니다.</p>
				</div>
				<p className="text-red">*표시는 필수 입력항목입니다.</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">
							이름<span className="text-red">*</span>
						</p>
						<div className="flex flex-col gap-2">
							<input
								type="text"
								placeholder="이름을 입력하세요"
								className={`${inputStyle} ${errors.name ? inputErrorStyle : ""} w-[518px] h-[48px] px-[30px]`}
								{...register("name", {
									required: "이름은 필수 입력 항목입니다.",
									pattern: {
										value: nameRegex,
										message: "이름은 한글만 입력 가능 하며, 2~6자 이내로 입력해 주세요.",
									},
								})}
							/>
							{errors.name && <p className="text-sm text-red">{getErrorMessage(errors.name)}</p>}
						</div>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">
							휴대폰 번호<span className="text-red">*</span>
						</p>
						<div className="flex flex-col gap-2">
							<input
								type="text"
								placeholder="-없이 입력"
								className={`${inputStyle} ${
									errors.phoneNumber ? inputErrorStyle : ""
								} w-[386px] h-[48px] px-[30px]`}
								{...register("phoneNumber", {
									required: "휴대폰 번호는 필수 입력 항목입니다.",
									pattern: {
										value: phoneNumberRegex,
										message: "휴대폰 번호를 형식에 맞게 입력해 주세요.",
									},
								})}
							/>
							{errors.phoneNumber && (
								<p className="text-sm text-red">{getErrorMessage(errors.phoneNumber)}</p>
							)}
						</div>
						<SmallBorderButton
							text={showVerificationInput ? "재전송" : "인증번호 요청"}
							size="sm"
							onClick={handleClickRequest}
						/>
					</div>
					{showVerificationInput && (
						<div className="flex gap-[10px] mt-[16px] ml-[130px]">
							<div className="flex flex-col gap-2">
								<div className="relative">
									<input
										type="text"
										placeholder="인증번호를 입력하세요"
										className={`${inputStyle} ${
											errors.verificationCode || verificationError || isExpired ? inputErrorStyle : ""
										} w-[447px] h-[48px] px-[30px]`}
										{...register("verificationCode", {
											required: "인증번호는 필수 입력 항목입니다.",
											pattern: {
												value: verificationCodeRegex,
												message: "인증번호를 형식에 맞게 입력해주세요.",
											},
										})}
									/>
									<span
										className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
											timeLeft === 0 ? "text-red" : "text-gray-500"
										}`}>
										{formatTime(timeLeft)}
									</span>
								</div>
								{verificationError && <p className="text-sm text-red">{verificationError}</p>}
								{isExpired && <p className="text-sm text-red">인증시간이 초과되었습니다.</p>}
								{errors.verificationCode && (
									<p className="text-sm text-red">{getErrorMessage(errors.verificationCode)}</p>
								)}
							</div>
							<SmallBorderButton text="확인" size="sm" onClick={handleSubmit(handleVerifyCode)} />
						</div>
					)}
					<div className="flex justify-center">
						<ColorButton text="다음" size="lg" disabled={!isValid || !isVerified} />
					</div>
				</form>
				{isModalOpen && <Modal text="인증을 완료하였습니다." onClose={closeModal} />}
			</div>
		</div>
	);
};

export default NoAuthSignUp;
