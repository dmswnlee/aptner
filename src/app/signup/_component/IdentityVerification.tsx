import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { nextStep, setPersonalInfo } from "@/stores/slice/registrationSlice";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import NoAuthSignUp from './NoAuthSignUp';

const buttonStyle = "w-[82px] h-[48px] border border-solid border-gray_06 bg-gray_00 text-gray_06";
const buttonClickedStyle = "w-[82px] h-[48px] text-gray_06 border border-solid border-gray_06 bg-blue_05 text-white";
export const inputStyle =
	"outline-none border border-solid border-gray_06 py-[15px] rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00";
export const inputErrorStyle = "border-red-500 text-red-500";

export const nameRegex = /^[가-힣]{2,6}$/;
const idNumberRegex = /^\d{1,6}$/;
const idNumberSuffixRegex = /^\d{1}$/;
export const phoneNumberRegex = /^\d{1,11}$/;
export const verificationCodeRegex = /^\d{6}$/;

const IdentityVerification = () => {
	const dispatch = useDispatch();
	const [isNoAuthSignUp, setIsNoAuthSignUp] = useState(false);
	const [gender, setGender] = useState("");
	const [showVerificationInput, setShowVerificationInput] = useState(false);
	const [carrierError, setCarrierError] = useState("");
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		register,
		setError,
		clearErrors,
		watch,
	} = useForm({
		mode: "onChange",
	});

	const phoneNumberValue = watch("phoneNumber");
	const carrierValue = watch("carrier");

	useEffect(() => {
		if (phoneNumberValue && !carrierValue) {
			setCarrierError("통신사를 선택해주세요.");
			setError("carrier", {
				type: "manual",
				message: "통신사를 선택해주세요.",
			});
		} else {
			clearErrors("carrier");
			setCarrierError("");
		}
	}, [phoneNumberValue, carrierValue, setError, clearErrors]);

	const onSubmit = (data: any) => {
		dispatch(
			setPersonalInfo({
				name: data.name,
				idNumber: `${data.idNumber}-${data.idNumberSuffix}`,
				phoneNumber: data.phoneNumber,
				gender: data.gender,
				carrier: data.carrier,
			}),
		);
		dispatch(nextStep());
		console.log(data);
	};

  const handleClickRequest = () => {
    setShowVerificationInput(!showVerificationInput)
  }

	if (isNoAuthSignUp) {
		return <NoAuthSignUp />;
	}

	const handleClickMove = () => {
		setIsNoAuthSignUp(!isNoAuthSignUp)
	}

	return (
		<div className="flex justify-center">
			<div className="w-[648px] flex flex-col gap-10">
				<div className="flex justify-between border-b-2 border-solid border-[#000000] py-1">
					<h3 className="text-2xl font-semibold">본인인증</h3>
					<div className="flex items-center px-[16px] py-[6px] gap-2 bg-gray_600 text-white rounded-full">
						<button onClick={handleClickMove}>본인인증 없이 회원가입</button>
						<FaArrowRight />
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">이름</p>
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
							{errors.name && <p className="text-sm text-red-500">{getErrorMessage(errors.name)}</p>}
						</div>
					</div>
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">주민번호</p>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-[10px]">
								<input
									type="text"
									placeholder="예)801105"
									className={`${inputStyle} ${errors.idNumber ? inputErrorStyle : ""} w-[240px] h-[48px] px-[30px]`}
									{...register("idNumber", {
										required: "주민번호는 필수 입력 항목입니다.",
										pattern: {
											value: idNumberRegex,
											message: "주민번호 앞자리를 형식에 맞게 입력해주세요.",
										},
									})}
								/>
								<span className="mx-[20px] text-gray_06">-</span>
								<input
									type="text"
									className={`${inputStyle} ${
										errors.idNumberSuffix ? inputErrorStyle : ""
									} w-[54px] h-[48px] px-[22px]`}
									{...register("idNumberSuffix", {
										required: "주민번호 뒷자리는 필수 입력 항목입니다.",
										pattern: {
											value: idNumberSuffixRegex,
											message: "주민번호 뒷자리에 숫자만 입력 가능합니다.",
										},
									})}
								/>
								<span className="text-gray_06">******</span>
							</div>
							<div>
								{errors.idNumber && <p className="text-sm text-red-500">{getErrorMessage(errors.idNumber)}</p>}
								{errors.idNumberSuffix && (
									<p className="text-sm text-red-500">{getErrorMessage(errors.idNumberSuffix)}</p>
								)}
							</div>
						</div>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">성별</p>
						<Controller
							name="gender"
							control={control}
							rules={{ required: "성별은 필수 입력 항목입니다." }}
							render={({ field }) => (
								<div className="flex flex-col gap-2">
									<div className="flex">
										<button
											type="button"
											className={`${field.value === "male" ? buttonClickedStyle : buttonStyle} rounded-l-lg`}
											onClick={() => {
												field.onChange("male");
												setGender("male");
											}}>
											남성
										</button>
										<button
											type="button"
											className={`${
												field.value === "female" ? buttonClickedStyle : buttonStyle
											} rounded-r-lg`}
											onClick={() => {
												field.onChange("female");
												setGender("female");
											}}>
											여성
										</button>
									</div>
									{errors.gender && <p className="text-sm text-red-500">{getErrorMessage(errors.gender)}</p>}
								</div>
							)}
						/>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">통신사 선택</p>
						<Controller
							name="carrier"
							control={control}
							rules={{ required: "통신사는 필수 입력 항목입니다." }}
							render={({ field }) => (
								<div className="flex flex-col gap-2">
									<div className="flex gap-4">
										<label>
											<input type="radio" {...field} value="KT" checked={field.value === "KT"} /> KT
										</label>
										<label>
											<input type="radio" {...field} value="LG U+" checked={field.value === "LG U+"} /> LG U+
										</label>
										<label>
											<input type="radio" {...field} value="SKT" checked={field.value === "SKT"} /> SKT
										</label>
									</div>
									<div className="flex gap-4">
										<label>
											<input
												type="radio"
												{...field}
												value="KT 알뜰폰"
												checked={field.value === "KT 알뜰폰"}
											/> KT 알뜰폰
										</label>
										<label>
											<input
												type="radio"
												{...field}
												value="LG U+ 알뜰폰"
												checked={field.value === "LG U+ 알뜰폰"}
											/> LG U+ 알뜰폰
										</label>
										<label>
											<input
												type="radio"
												{...field}
												value="SKT 알뜰폰"
												checked={field.value === "SKT 알뜰폰"}
											/> SKT 알뜰폰
										</label>
									</div>
									{carrierError && <p className="text-sm text-red-500">{carrierError}</p>}
								</div>
							)}
						/>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">휴대폰 번호</p>
						<div className="flex flex-col gap-2">
							<input
								type="text"
								placeholder="-없이 입력"
								className={`${inputStyle} ${errors.phoneNumber ? inputErrorStyle : ""} w-[386px] h-[48px] px-[30px]`}
								{...register("phoneNumber", {
									required: "휴대폰 번호는 필수 입력 항목입니다.",
									pattern: {
										value: phoneNumberRegex,
										message: "휴대폰 번호를 형식에 맞게 입력해 주세요.",
									},
								})}
							/>
							{errors.phoneNumber && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.phoneNumber)}</p>
							)}
						</div>
						<SmallBorderButton text="인증번호 요청" size="sm" onClick={handleClickRequest} />
					</div>
					{showVerificationInput && (
						<div className="flex gap-[10px] mt-[16px] ml-[130px]">
							<div className="flex flex-col gap-2">
								<input
									type="text"
									placeholder="인증번호를 입력하세요"
									className={`${inputStyle} ${
										errors.verificationCode ? inputErrorStyle : ""
									} w-[447px] h-[48px] px-[30px]`}
									{...register("verificationCode", {
										required: "인증번호는 필수 입력 항목입니다.",
										pattern: {
											value: verificationCodeRegex,
											message: "인증번호를 형식에 맞게 입력해주세요.",
										},
									})}
								/>
								{errors.verificationCode && (
									<p className="text-sm text-red-500">{getErrorMessage(errors.verificationCode)}</p>
								)}
							</div>
							<SmallBorderButton text="확인" size="sm" />
						</div>
					)}
					<div className="flex justify-center">
						<ColorButton text="다음" size="lg" disabled={!isValid} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default IdentityVerification;

export const getErrorMessage = (error: any) => {
	if (error) {
		if (error.message) {
			return error.message;
		}
		if (typeof error === "string") {
			return error;
		}
	}
	return undefined;
};
