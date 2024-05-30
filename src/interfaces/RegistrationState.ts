import { TermsState } from './Term';

export interface RegistrationState {
	step: number;
	personalInfo: {
		name: string;
		idNumber: string;
		phoneNumber: string;
		gender: string;
		carrier: string;
		verificationCode: string;
	};
	accountInfo: {
		email: string;
		password: string;
	};
	addressInfo: {
		nickname: string;
		code: string;
		apartDetailInfo: {
			dong: number;
			ho: number;
		};
	};
	termsAgreements: Array<{ termsId: number; isAgreed: boolean }>;
	termsState: TermsState;
}