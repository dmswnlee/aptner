import { RegistrationState } from '@/interfaces/RegistrationState';
import { Term, TermsState } from '@/interfaces/Term';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTermsState: TermsState = {
	termsInfoList: [],
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
	},
	addressInfo: {
		nickname: "",
		code: "RO000",
		apartDetailInfo: {
			dong: 0,
			ho: 0,
		},
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
		reset(state) {
			return initialState;
		},
		submitRegistration(state) {
			//
		},
	},
});

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
	reset,
	submitRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
