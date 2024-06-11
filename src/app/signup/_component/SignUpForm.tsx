import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { nextStep, setAccountInfo } from "@/stores/slice/registrationSlice";
import { RootState } from "@/stores/store";
import ColorButton from "@/components/buttons/ColorButton";
import { inputErrorStyle, inputStyle } from "./IdentityVerification";

const idRegex = /^[a-zA-Z0-9_]+$/;

const inputDefault = "w-[518px] border border-solid border-gray_06 px-[30px] py-[15px] rounded-[5px] bg-[#F7F7F7]";

const SignUpForm = () => {
	const dispatch = useDispatch();
	const { name, phoneNumber } = useSelector((state: RootState) => state.registration.personalInfo);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm({
		mode: "onChange",
	});

	const handleNext = (data: any) => {
		dispatch(
			setAccountInfo({
				email: data.email,
				password: data.password,
			}),
		);
		dispatch(nextStep());
		console.log(data);
	};

	const validatePasswordMessage = (password: string) => {
		if (/(.)\1{2,}/.test(password)) {
			return "동일한 문자는 3글자 이상 반복 사용이 불가합니다.";
		}
		if (/(\d)\1{2,}/.test(password)) {
			return "연속된 문자열은 3글자 이상 사용이 불가합니다.";
		}
		if (!/^.{8,20}$/.test(password)) {
			return "비밀번호는 영어, 숫자, 특수문자를 사용하여 8~20자리여야 합니다.";
		}
		if (!/^(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*\W)|(?=.*\d)(?=.*\W).*$/.test(password)) {
			return "비밀번호는 숫자, 특수문자, 영문자 중 2가지 이상 사용해야 합니다.";
		}
		return true;
	};

	return (
		<div className="flex justify-center">
			<div className="w-[648px] flex flex-col gap-10">
				<div className="flex flex-col gap-[16px]">
				<p className="text-red">*표시는 필수 입력항목입니다.</p>
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">이름</p>
						<p className={`${inputDefault}`}>{name}</p>
					</div>
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">휴대폰 번호</p>
						<p className={`${inputDefault}`}>{phoneNumber}</p>
					</div>
					<form onSubmit={handleSubmit(handleNext)} className="flex flex-col gap-5">
						<div className="flex gap-[10px]">
							<p className="w-[120px] p-[10px]">
								아이디<span className="text-red">*</span>
							</p>
							<div className="flex flex-col gap-2">
								<input
									type="text"
									placeholder="아이디를 입력하세요"
									{...register("email", {
										required: "아이디는 필수 입력 항목입니다.",
										pattern: {
											value: idRegex,
											message: "아이디는 영어, 숫자, _만 사용하여 4~20자리여야 합니다.",
										},
									})}
									className={`${inputStyle} ${
										errors.email ? inputErrorStyle : ""
									} w-[518px] h-[48px] px-[30px]`}
								/>
								{errors.email && <p className="text-red">{getErrorMerge(errors.email)}</p>}
							</div>
						</div>
						<div className="flex gap-[10px]">
							<label htmlFor="password" className="w-[120px] p-[10px]">
								비밀번호<span className="text-red">*</span>
							</label>
							<div className="flex flex-col gap-2">
								<input
									id="password"
									type="password"
									placeholder="비밀번호를 입력하세요"
									{...register("password", {
										required: "비밀번호는 필수 입력 항목입니다.",
										validate: validatePasswordMessage,
									})}
									className={`${inputStyle} ${
										errors.password ? inputErrorStyle : ""
									} w-[518px] h-[48px] px-[30px]`}
								/>
								{errors.password && <p className="text-red">{getErrorMerge(errors.password)}</p>}
							</div>
						</div>
						<div className="flex gap-[10px]">
							<label htmlFor="confirmPassword" className="w-[120px] p-[10px]">
								비밀번호 확인<span className="text-red">*</span>
							</label>
							<div className="flex flex-col gap-2">
								<input
									id="confirmPassword"
									type="password"
									placeholder="비밀번호를 다시 입력하세요"
									{...register("confirmPassword", {
										required: "비밀번호 확인은 필수 입력 항목입니다.",
										validate: value => value === watch("password") || "비밀번호가 일치하지 않습니다.",
									})}
									className={`${inputStyle} ${
										errors.confirmPassword ? inputErrorStyle : ""
									} w-[518px] h-[48px] px-[30px]`}
								/>
								{errors.confirmPassword && (
									<p className="text-red">{getErrorMerge(errors.confirmPassword)}</p>
								)}
							</div>
						</div>
						<div className="flex justify-center">
							<ColorButton text="다음" size="lg" disabled={!isValid} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;

export const getErrorMerge = (
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
): string | undefined => {
	if (error) {
		if (typeof error.message === "string") {
			return error.message;
		}
	}
	return undefined;
};