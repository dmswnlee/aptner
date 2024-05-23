import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import ColorButton from "@/components/buttons/ColorButton";
import TermsBox from "./TermsBox";
import { RootState } from "@/stores/store";
import { fetchTermsStart, nextStep, setTermsAgreements } from "@/stores/slice/registrationSlice";

const Agreement = () => {
	const dispatch = useDispatch();
	const { termsInfoList, error, loading } = useSelector(
		(state: RootState) => state.registration.termsState,
	);
	const { control, handleSubmit, setValue, watch } = useForm({
		mode: "onChange",
		defaultValues: {
			service: false,
			personalInfo: false,
			marketing: false,
			allChecked: false,
		},
	});

	useEffect(() => {
		dispatch(fetchTermsStart());
	}, [dispatch]);

	const serviceValue = watch("service");
	const personalInfoValue = watch("personalInfo");
	const marketingValue = watch("marketing");

	useEffect(() => {
		setValue("allChecked", serviceValue && personalInfoValue && marketingValue);
	}, [serviceValue, personalInfoValue, marketingValue, setValue]);

	const serviceTerms = termsInfoList.find(term => term.id === 1);
	const personalInfoTerms = termsInfoList.find(term => term.id === 2);
	const marketingTerms = termsInfoList.find(term => term.id === 3);

	if (loading) {
		return <div>Loading...</div>;
	}

	const onSubmit = (data: any) => {
		const termsAgreements = [
			{ termsId: 1, isAgreed: data.service },
			{ termsId: 2, isAgreed: data.personalInfo },
			{ termsId: 3, isAgreed: data.marketing },
		];
		dispatch(setTermsAgreements(termsAgreements));
		dispatch(nextStep());
    console.log(data);
	};

	return (
		<div className="flex justify-center">
			<div className="w-[720px] flex flex-col gap-10">
				<div className="w-full border-solid border-b-2 border-[#000000]">
					<h3 className="text-xl font-semibold py-[10px]">약관동의</h3>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					{serviceTerms && <TermsBox title={serviceTerms.title} content={serviceTerms.content} />}
					<div className="flex items-center gap-[10px]">
						<Controller
							name="service"
							control={control}
							rules={{ required: "필수 항목입니다." }}
							render={({ field }) => (
								<input
									type="checkbox"
									checked={field.value}
									onChange={field.onChange}
									className="w-[20px] h-[20px]"
								/>
							)}
						/>
						<p>
							<span className="text-blue_05 font-semibold">(필수)</span> 서비스 이용약관 동의
						</p>
					</div>
					{personalInfoTerms && <TermsBox title={personalInfoTerms.title} content={personalInfoTerms.content} />}
					<div className="flex items-center gap-[10px]">
						<Controller
							name="personalInfo"
							control={control}
							rules={{ required: "필수 항목입니다." }}
							render={({ field }) => (
								<input
									type="checkbox"
									checked={field.value}
									onChange={field.onChange}
									className="w-[20px] h-[20px]"
								/>
							)}
						/>
						<p>
							<span className="text-blue_05 font-semibold">(필수)</span> 개인정보 수집 동의
						</p>
					</div>
					{marketingTerms && <TermsBox title={marketingTerms.title} content={marketingTerms.content} />}
					<div className="flex items-center gap-[10px]">
						<Controller
							name="marketing"
							control={control}
							render={({ field }) => (
								<input
									type="checkbox"
									checked={field.value}
									onChange={field.onChange}
									className="w-[20px] h-[20px]"
								/>
							)}
						/>
						<p>
							<span className="text-gray_07 font-semibold">(선택)</span> 마케팅 수신 동의
						</p>
					</div>
					<div className="w-full h-[1px] bg-gray_04"></div>
					<div className="flex items-center gap-[10px]">
						<Controller
							name="allChecked"
							control={control}
							render={({ field }) => (
								<input
									type="checkbox"
									checked={field.value}
									onChange={e => {
										const isChecked = e.target.checked;
										setValue("service", isChecked);
										setValue("personalInfo", isChecked);
										setValue("marketing", isChecked);
										field.onChange(isChecked);
									}}
									className="w-[20px] h-[20px]"
								/>
							)}
						/>
						<p className="text-blue_05">전체 약관 동의</p>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex justify-center">
						<ColorButton text="다음" size="lg" disabled={!serviceValue || !personalInfoValue} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Agreement;
