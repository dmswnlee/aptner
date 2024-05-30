import LargeBorderButton from "@/components/buttons/LargeBorderButton";
import { setAddressInfo, submitRegistration } from "@/stores/slice/registrationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RootState } from "@/stores/store";
import SignUpSuccess from "./SignUpSuccess";
import { getErrorMerge } from "./SignUpForm";

const nicknameRegex = /^[가-힣a-zA-Z0-9_]+$/;
const apartmentRegex = /^[가-힣0-9]+$/;

const inputStyle =
	"w-[518px] h-[48px] px-[30px] py-[15px] border border-solid border-gray_06 rounded-[5px] bg-[#F7F7F7]";
const inputErrorStyle = "border-red";

const ApartmentForm = () => {
	const dispatch = useDispatch();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const registrationData = useSelector((state: RootState) => state.registration);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			nickname: "",
			apartmentDong: "",
			apartmentHo: "",
		},
	});

	const handleNext = (data: any) => {
		dispatch(
			setAddressInfo({
				nickname: data.nickname,
				code: "RO000",
				apartDetailInfo: {
					dong: data.apartmentDong,
					ho: data.apartmentHo,
				},
			}),
		);

		dispatch(submitRegistration());
		setIsSubmitted(true);
		console.log(data);
		console.log(registrationData);
	};

	useEffect(() => {
		console.log("Updated registration data:", registrationData);
	}, [registrationData]);

	if (isSubmitted) {
		return <SignUpSuccess />;
	}

	return (
		<div className="flex justify-center">
			<div className="w-[648px] flex flex-col gap-10">
				<p className="text-red">*표시는 필수 입력항목입니다.</p>
				<form onSubmit={handleSubmit(handleNext)} className="flex flex-col gap-[60px]">
					<div className="flex flex-col gap-[32px] items-center">
						<div className="flex gap-[10px]">
							<p className="w-[120px] p-[10px]">
								닉네임<span className="text-red">*</span>
							</p>
							<div className="flex flex-col gap-2">
								<input
									type="text"
									placeholder="닉네임 입력"
									{...register("nickname", {
										required: "닉네임은 필수 입력 항목입니다.",
										pattern: {
											value: nicknameRegex,
											message: "닉네임은 한국어, 영어, 숫자, 특수문자(_)만 입력 가능 합니다.",
										},
										minLength: {
											value: 2,
											message: "닉네임은 2~20자 이내로 입력해주세요",
										},
										maxLength: {
											value: 20,
											message: "닉네임은 2~20자 이내로 입력해주세요",
										},
									})}
									className={`${inputStyle} ${errors.nickname ? inputErrorStyle : ""}`}
								/>
								{errors.nickname && <p className="text-red">{getErrorMerge(errors.nickname)}</p>}
							</div>
						</div>
						<div className="flex gap-[10px]">
							<p className="w-[120px] p-[10px]">
								아파트 동<span className="text-red">*</span>
							</p>
							<div className="flex flex-col gap-2">
								<input
									type="text"
									placeholder="아파트 동 입력"
									{...register("apartmentDong", {
										required: "아파트 동은 필수 입력 항목입니다.",
										pattern: {
											value: apartmentRegex,
											message: "아파트 동은 숫자, 한글만 사용하여 1~10자 이내로 입력해주세요",
										},
									})}
									className={`${inputStyle} ${errors.apartmentDong ? inputErrorStyle : ""}`}
								/>
								{errors.apartmentDong && <p className="text-red">{getErrorMerge(errors.apartmentDong)}</p>}
							</div>
						</div>
						<div className="flex gap-[10px]">
							<p className="w-[120px] p-[10px]">
								아파트 호<span className="text-red">*</span>
							</p>
							<div className="flex flex-col gap-2">
								<input
									type="text"
									placeholder="아파트 호 입력"
									{...register("apartmentHo", {
										required: "아파트 호수는 필수 입력 항목입니다.",
										pattern: {
											value: apartmentRegex,
											message: "아파트 호수는 숫자, 한글만 사용하여 1~10자 이내로 입력해주세요",
										},
									})}
									className={`${inputStyle} ${errors.apartmentHo ? inputErrorStyle : ""}`}
								/>
								{errors.apartmentHo && <p className="text-red">{getErrorMerge(errors.apartmentHo)}</p>}
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<LargeBorderButton text="가입하기" disabled={!isValid} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default ApartmentForm;
