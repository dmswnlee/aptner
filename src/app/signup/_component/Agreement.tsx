import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorButton from "@/components/buttons/ColorButton";
import CheckAgreement from "./CheckAgreement";
import TermsBox from "./TermsBox";
import { RootState } from "@/stores/store";
import {
  fetchTermsStart,
  toggleAllChecked,
  toggleMarketing,
  togglePersonalInfo,
  toggleService,
} from "@/stores/slice/registrationSlice";
import { nextStep, setTermsAgreements } from '@/stores/slice/registrationSlice';

const Agreement = () => {
  const dispatch = useDispatch();
  const { termsInfoList, service, personalInfo, marketing, allChecked, error, loading } = useSelector(
    (state: RootState) => state.registration.termsState,
  );

  useEffect(() => {
    dispatch(fetchTermsStart());
  }, [dispatch]);

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

  const serviceTerms = termsInfoList.find(term => term.id === 1);
  const personalInfoTerms = termsInfoList.find(term => term.id === 2);
  const marketingTerms = termsInfoList.find(term => term.id === 3);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    const termsAgreements = [
      { termsId: 1, isAgreed: service },
      { termsId: 2, isAgreed: personalInfo },
      { termsId: 3, isAgreed: marketing }
    ];
    dispatch(setTermsAgreements(termsAgreements));
    dispatch(nextStep());				
  };

  return (
    <div className="flex justify-center">
      <div className="w-[720px] flex flex-col gap-10">
        <div className="w-full border-solid border-b-2 border-[#222222]">
          <h3 className="text-xl font-semibold py-[10px]">약관동의</h3>
        </div>
        <div className="flex flex-col gap-5">
          {serviceTerms && <TermsBox title={serviceTerms.title} content={serviceTerms.content} />}
          <CheckAgreement
            checked={service}
            onChange={handleServiceChange}
            required="필수"
            text="서비스 이용약관 동의"
          />
          {personalInfoTerms && <TermsBox title={personalInfoTerms.title} content={personalInfoTerms.content} />}
          <CheckAgreement
            checked={personalInfo}
            onChange={handlePersonalInfoChange}
            required="필수"
            text="개인정보 수집 동의"
          />
          {marketingTerms && <TermsBox title={marketingTerms.title} content={marketingTerms.content} />}
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
          <ColorButton text="다음" size="lg" disabled={!service || !personalInfo} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Agreement;
