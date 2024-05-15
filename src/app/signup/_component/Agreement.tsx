"use client";
import ColorButton from "@/components/buttons/ColorButton";
import CheckAgreement from "./CheckAgreement";
import TermsBox from "./TermsBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { toggleAllChecked, toggleMarketing, togglePersonalInfo, toggleService } from "@/stores/slice/termsSlice";

const Agreement = () => {
	const dispatch = useDispatch();
	const { service, personalInfo, marketing, allChecked, error } = useSelector((state: RootState) => state.terms);

	const handleServiceChange = () => {
		dispatch(toggleService());
	};

	const handlePersonalInfoChange = () => {
		dispatch(togglePersonalInfo());
	};

	const handleMarketingChange = () => {
		dispatch(toggleMarketing());
	};

	const handleAllCheckedChange = () => {
		dispatch(toggleAllChecked());
	};

	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<h3 className="text-2xl font-semibold">본인인증</h3>
				<div className="flex flex-col gap-5">
					<TermsBox content="서비스 이용약관 동의 내용" />
					<CheckAgreement
						checked={service}
						onChange={handleServiceChange}
						required="필수"
						text="서비스 이용약관 동의"
					/>
					<TermsBox content="개인정보 수집 동의 내용" />
					<CheckAgreement
						checked={personalInfo}
						onChange={handlePersonalInfoChange}
						required="필수"
						text="개인정보 수집 동의"
					/>
					<TermsBox content="마케팅 수신 동의 내용" />
					<CheckAgreement
						checked={marketing}
						onChange={handleMarketingChange}
						required="선택"
						text="마케팅 수신 동의"
					/>
					<div className="w-full h-[1px] bg-gray_04"></div>
					<div className="flex gap-[10px]">
						<input
							type="checkbox"
							checked={allChecked}
							onChange={handleAllCheckedChange}
							className="w-[20px] h-[20px]"
						/>
						<p className="text-blue_05">전체 약관 동의</p>
					</div>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex justify-center">
					<ColorButton text="다음" size="lg" disabled={!service || !personalInfo} />
				</div>
			</div>
		</div>
	);
};

export default Agreement;
