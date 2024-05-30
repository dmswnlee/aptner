import ColorButton from "@/components/buttons/ColorButton";
import TitleInput from "@/components/input/TitleInput";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";

const PasswordForm = () => {
	return (
		<form className="flex flex-col gap-[10px] mt-[80px]">
			<TitleInput title="아이디" size="lg" />
			<TitleInput title="이름" size="lg" />
			<div className="flex">
				<TitleInput title="휴대폰 번호" placeholder="-없이 입력" size="md" />
				<div className="ml-4">
					<SmallBorderButton text="인증번호 요청" size="sm" />
				</div>
			</div>
			<div className="flex justify-end">
				<input
					type="text"
					className="w-[352px] h-[48px] outline-none border border-solid border-[#BBBBBB] px-[30px] py-[15px] rounded-[5px]"
				/>
				<div className="ml-4">
					<SmallBorderButton text="확인" size="sm" />
				</div>
			</div>
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="비밀번호 조회하기" size="lg" />
			</div>
		</form>
	);
};

export default PasswordForm;
