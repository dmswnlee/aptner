import ColorButton from "@/components/buttons/ColorButton";
import TitleInput from "@/components/input/TitleInput";

const IdForm = () => {
	return (
		<form className="flex flex-col gap-[10px] mt-[80px]">
			<TitleInput title="이름" placeholder="이름을 입력해 주세요." size="lg" />
			<TitleInput title="휴대폰 번호" placeholder="휴대폰 번호를 입력해 주세요." size="lg" />
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="아이디 찾기" size="lg" />
			</div>
		</form>
	);
};

export default IdForm;
