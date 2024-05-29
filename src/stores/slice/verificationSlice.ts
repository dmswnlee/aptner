import { SendVerificationPayload, VerificationState, VerifyCodePayload } from '@/interfaces/VerificationState';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VerificationState = {
	phoneNumber: "",
	verificationCode: "",
	expiredAt: null,
	isVerified: false,
	isLoading: false,
	error: null,
	isExpired: false,
};

const verificationSlice = createSlice({
	name: "verification",
	initialState,
	reducers: {
		sendVerificationRequest(state, action: PayloadAction<SendVerificationPayload>) {
			state.isLoading = true;
			state.error = null;
			state.isExpired = false;
		},
		sendVerificationSuccess(state, action: PayloadAction<{ code: string; expiredAt: string }>) {
			state.isLoading = false;
			state.verificationCode = action.payload.code;
			state.expiredAt = action.payload.expiredAt;
		},
		sendVerificationFailure(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		verifyCodeRequest(state, action: PayloadAction<VerifyCodePayload>) {
			state.isLoading = true;
			state.error = null;
		},
		verifyCodeSuccess(state) {
			state.isLoading = false;
			state.isVerified = true;
		},
		verifyCodeFailure(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		setVerificationExpired(state) {
      state.isExpired = true;
    },
	},
});

export const {
	sendVerificationRequest,
	sendVerificationSuccess,
	sendVerificationFailure,
	verifyCodeRequest,
	verifyCodeSuccess,
	verifyCodeFailure,
	setVerificationExpired,
} = verificationSlice.actions;

export default verificationSlice.reducer;
