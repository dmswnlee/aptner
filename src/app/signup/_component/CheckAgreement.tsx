import ColorButton from '@/components/buttons/ColorButton';
import VerificationForm from './VerificationForm';

const CheckAgreement = () => {
	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<h3 className="text-2xl font-semibold">본인인증</h3>
				<div className="flex flex-col gap-5">
					<VerificationForm content="서비스 이용약관 동의 내용" required="필수" text="서비스 이용약관 동의" />
					<VerificationForm content="개인정보 수집 동의 내용" required="필수" text="개인정보 수집 동의" />
					<VerificationForm content="마케팅 수신 동의 내용" required="선택" text="마케팅 수신 동의" />
					<div className="w-full h-[1px] bg-gray_04"></div>
					<div className="flex gap-[10px]">
						<input type="checkbox" className="w-[20px] h-[20px]" />
						<p className="text-blue_05">전체 약관 동의</p>
					</div>
				</div>
				<div className="flex justify-center">
					<ColorButton text="다음" size="lg" />
				</div>
			</div>
		</div>
	);
};

export default CheckAgreement;
