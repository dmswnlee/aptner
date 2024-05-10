import ColorButton from "@/components/buttons/ColorButton";
import TitleInput from "@/components/input/TitleInput";
import RadioForm from "./RadioForm";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import { FaArrowRight } from "react-icons/fa6";

const buttonStyle = "w-[82px] h-[48px] text-gray_06 border border-solid border-gray_06 bg-gray_00";
const inputStyle =
	"outline-none border border-solid border-gray_06 px-[30px] py-[15px] rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00";

const IdentityVerification = () => {
	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<div className="flex justify-between">
					<h3 className="text-2xl font-semibold">본인인증</h3>
					<div className="flex items-center px-[16px] py-[6px] gap-2 border border-solid border-gray_07 rounded-full">
						<button>본인인증 없이 회원가입</button>
						<FaArrowRight />
					</div>
				</div>
				<div className="flex flex-col gap-[16px]">
					<TitleInput title="이름" size="lg" />
					<div className="flex items-center gap-[10px]">
						<p className="w-[120px] p-[10px]">주민번호</p>
						<input type="text" placeholder="예)801105" className={`${inputStyle}`} />
						<span className="mx-[20px] text-gray_06">-</span>
						<input type="text" className={`w-[54px] ${inputStyle}`} />
						<span className="text-gray_06">******</span>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">성별</p>
						<div className="flex justify-center items-center">
							<button className={`${buttonStyle} rounded-l-lg`}>남성</button>
							<button className={`${buttonStyle} rounded-r-lg`}>여성</button>
						</div>
					</div>
					<div className="flex gap-[10px]">
						<p className="w-[120px] p-[10px]">통신사 선택</p>
						<div className="flex flex-col gap-2 p-[10px]">
							<div className="flex gap-4">
								<RadioForm text="KT" />
								<RadioForm text="LG U+" />
								<RadioForm text="SKT" />
							</div>
							<div className="flex gap-4">
								<RadioForm text="KT 알뜰폰" />
								<RadioForm text="LG U+ 알뜰폰" />
								<RadioForm text="SKT 알뜰폰" />
							</div>
						</div>
					</div>
					<div className="flex gap-4">
						<TitleInput title="휴대폰 번호" size="lg" placeholder="-없이 입력" />
						<SmallBorderButton text="인증번호 요청" />
					</div>
				</div>
				<div className="flex justify-center">
					<ColorButton text="다음" size="lg" />
				</div>
			</div>
		</div>
	);
};

export default IdentityVerification;
