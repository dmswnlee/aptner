import ColorButton from "@/components/buttons/ColorButton";
import FormInput from "./FormInput";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";

const PasswordForm = () => {
	return (
		<form className="flex flex-col gap-[10px] mt-[80px]">
			<FormInput title="아이디" size="lg" />
			<FormInput title="이름" size="lg" />
			<div className="flex">
				<FormInput title="휴대폰 번호" placeholder="-없이 입력" size="md" />
				<SmallBorderButton text="인증번호 요청" />
			</div>
			<div className="flex justify-end">
				<input
					type="text"
					className="w-[352px] h-[48px] outline-none border border-solid border-[#BBBBBB] px-[30px] py-[15px] rounded-[5px]"
				/>
				<SmallBorderButton text="확인" />
			</div>
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="비밀번호 조회하기" size="lg" />
			</div>
		</form>
	);
};

export default PasswordForm;
