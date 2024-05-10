import LargeBorderButton from "@/components/buttons/LargeBorderButton";
import InputForm from "@/components/input/InputForm";

const ApartmentForm = () => {

	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<div className="flex flex-col gap-[50px] items-center">
					<div className="flex flex-col items-center text-[20px]">
						<p>
							<span className="text-[#F7444F]">아파트 동, 호 정보를 입력한 후, 관리사무소의 인증</span>을 받아야
						</p>
						<p>아파트너 서비스를 이용할 수 있습니다.</p>
					</div>
					<InputForm type="text" placeholder="닉네임 입력" />
          <InputForm type="text" placeholder="아파트 동 입력" />
          <InputForm type="text" placeholder="아파트 호 입력" />
				</div>
				<div className="flex justify-center">
					<LargeBorderButton text="다음" />
				</div>
			</div>
		</div>
	);
};

export default ApartmentForm;
