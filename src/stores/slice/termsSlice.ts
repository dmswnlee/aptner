import { createSlice } from "@reduxjs/toolkit";

interface TermsState {
	service: boolean;
	personalInfo: boolean;
	marketing: boolean;
	allChecked: boolean;
	error: string;
}

const initialState: TermsState = {
	service: false,
	personalInfo: false,
	marketing: false,
	allChecked: false,
	error: "",
};

const termsSlice = createSlice({
	name: "terms",
	initialState,
	reducers: {
		toggleService: state => {
			state.service = !state.service;
			state.allChecked = state.service && state.personalInfo && state.marketing;
			updateErrorState(state);
		},
		togglePersonalInfo: state => {
			state.personalInfo = !state.personalInfo;
			state.allChecked = state.service && state.personalInfo && state.marketing;
			updateErrorState(state);
		},
		toggleMarketing: state => {
			state.marketing = !state.marketing;
			state.allChecked = state.service && state.personalInfo && state.marketing;
		},
		toggleAllChecked: state => {
			const newValue = !state.allChecked;
			state.allChecked = newValue;
			state.service = newValue;
			state.personalInfo = newValue;
			state.marketing = newValue;
			updateErrorState(state);
		},
	},
});

function updateErrorState(state: any) {
	if (!state.service || !state.personalInfo) {
		state.error = "필수 약관에 동의하셔야 합니다.";
	} else {
		state.error = "";
	}
}

export const { toggleService, togglePersonalInfo, toggleMarketing, toggleAllChecked } = termsSlice.actions;
export default termsSlice.reducer;
