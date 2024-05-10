import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import TitleInput from "@/components/input/TitleInput";

const SignUpForm = () => {
	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<div className="flex flex-col gap-[16px]">
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">이름</p>
						<p>홍길동</p>
					</div>
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">휴대폰 번호</p>
						<p>01012341234</p>
					</div>
					<div className="flex">
						<TitleInput title="아이디" size="lg" message="6글자 이상의 영문, 숫자, _만 입력할 수 있습니다." />
						<SmallBorderButton text="중복확인" />
					</div>
					<TitleInput title="비밀번호" size="lg" />
					<TitleInput
						title="비밀번호 확인"
						size="lg"
						message="확인란에 입력한 비밀번호는 상단 내용과 동일해야 합니다."
					/>
				</div>
				<div className="flex justify-center">
					<ColorButton text="다음" size="lg" />
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
