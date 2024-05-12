import ColorButton from "@/components/buttons/ColorButton";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import TitleInput from "@/components/input/TitleInput";

const NoAuthSignUp = () => {
	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<h3 className="text-2xl font-semibold">본인인증 없이 회원가입</h3>
				<div className="text-sm text-[#777777]">
					<p>휴대폰 본인인증이 불가능한 경우, 휴대폰 소유여부만 확인하고 회원가입을 할 수 있습니다.</p>
					<p>단, 투표 시 모바일 전자투표 참여가 어려울 수 있습니다.</p>
				</div>
				<div className="flex flex-col gap-5">
					<TitleInput title="이름" size="lg" />
					<div className="flex gap-4">
						<TitleInput title="휴대폰 번호" size="lg" placeholder="-없이 입력" />
						<SmallBorderButton text="인증번호 요청" size="sm" />
					</div>
				</div>
				<div className="flex justify-center">
					<ColorButton text="다음" size="lg" />
				</div>
			</div>
		</div>
	);
};

export default NoAuthSignUp;
