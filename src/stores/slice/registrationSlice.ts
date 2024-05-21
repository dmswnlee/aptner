import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Term {
	id: number;
	title: string;
	content: string;
	type: string;
	isRequired: boolean;
}

interface TermsState {
	termsInfoList: Term[];
	service: boolean;
	personalInfo: boolean;
	marketing: boolean;
	allChecked: boolean;
	error: string | null;
	loading: boolean;
}

export interface RegistrationState {
	step: number;
	personalInfo: {
		name: string;
		idNumber: string;
		phoneNumber: string;
		gender: string;
		carrier: string;
	};
	accountInfo: {
		email: string;
		password: string;
		nickname: string;
	};
	addressInfo: {
		code: string;
		dong: number;
		ho: number;
	};
	termsAgreements: Array<{ termsId: number; isAgreed: boolean }>;
	termsState: TermsState;
}

const initialTermsState: TermsState = {
	termsInfoList: [],
	service: false,
	personalInfo: false,
	marketing: false,
	allChecked: false,
	error: null,
	loading: false,
};

const initialState: RegistrationState = {
	step: 1,
	personalInfo: {
		name: "",
		idNumber: "",
		phoneNumber: "",
		gender: "",
		carrier: "",
	},
	accountInfo: {
		email: "",
		password: "",
		nickname: "",
	},
	addressInfo: {
		code: "RO000",
		dong: 0,
		ho: 0,
	},
	termsAgreements: [
		{ termsId: 1, isAgreed: false },
		{ termsId: 2, isAgreed: false },
		{ termsId: 3, isAgreed: false },
	],
	termsState: initialTermsState,
};

const registrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		nextStep(state) {
			state.step += 1;
		},
		prevStep(state) {
			state.step -= 1;
		},
		setPersonalInfo(state, action: PayloadAction<RegistrationState["personalInfo"]>) {
			state.personalInfo = action.payload;
		},
		setAccountInfo(state, action: PayloadAction<RegistrationState["accountInfo"]>) {
			state.accountInfo = action.payload;
		},
		setAddressInfo(state, action: PayloadAction<RegistrationState["addressInfo"]>) {
			state.addressInfo = action.payload;
		},
		setTermsAgreements(state, action: PayloadAction<RegistrationState["termsAgreements"]>) {
			state.termsAgreements = action.payload;
		},
		fetchTermsStart(state) {
			state.termsState.loading = true;
		},
		fetchTermsSuccess(state, action: PayloadAction<Term[]>) {
			state.termsState.loading = false;
			state.termsState.termsInfoList = action.payload;
			state.termsState.error = null;
		},
		fetchTermsFailure(state, action: PayloadAction<string>) {
			state.termsState.loading = false;
			state.termsState.error = action.payload;
		},
		toggleService(state) {
			state.termsState.service = !state.termsState.service;
			state.termsState.allChecked =
				state.termsState.service && state.termsState.personalInfo && state.termsState.marketing;
			//updateErrorState(state.termsState);
		},
		togglePersonalInfo(state) {
			state.termsState.personalInfo = !state.termsState.personalInfo;
			state.termsState.allChecked =
				state.termsState.service && state.termsState.personalInfo && state.termsState.marketing;
			//updateErrorState(state.termsState);
		},
		toggleMarketing(state) {
			state.termsState.marketing = !state.termsState.marketing;
			state.termsState.allChecked =
				state.termsState.service && state.termsState.personalInfo && state.termsState.marketing;
		},
		toggleAllChecked(state) {
			const newValue = !state.termsState.allChecked;
			state.termsState.allChecked = newValue;
			state.termsState.service = newValue;
			state.termsState.personalInfo = newValue;
			state.termsState.marketing = newValue;
			// updateErrorState(state.termsState);
		},
		reset(state) {
			return initialState;
		},
		submitRegistration(state) {
			//
		},
	},
});

// TODO : 경고문구 아닌 팝업으로 사용예정 
// function updateErrorState(state: TermsState) {
// 	if (!state.service || !state.personalInfo) {
// 		state.error = "필수 약관에 동의하셔야 합니다.";
// 	} else {
// 		state.error = "";
// 	}
// }

export const {
	nextStep,
	prevStep,
	setPersonalInfo,
	setAccountInfo,
	setAddressInfo,
	setTermsAgreements,
	fetchTermsStart,
	fetchTermsSuccess,
	fetchTermsFailure,
	toggleService,
	togglePersonalInfo,
	toggleMarketing,
	toggleAllChecked,
	reset,
	submitRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;