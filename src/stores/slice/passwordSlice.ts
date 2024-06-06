import { PasswordPayload, PasswordState, UpdatePasswordPayload } from '@/interfaces/FindIdPassword';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PasswordState = {
	isLoading: false,
	error: null,
	successMessage: "",
};

const passwordSlice = createSlice({
	name: "password",
	initialState,
	reducers: {
		fetchPasswordRequest: (state, action: PayloadAction<PasswordPayload>) => {
			state.isLoading = true;
			state.error = null;
		},
		fetchPasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		fetchPasswordFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		updatePasswordRequest: (state, action: PayloadAction<UpdatePasswordPayload>) => {
			state.isLoading = true;
			state.error = null;
		},
		updatePasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		updatePasswordFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		fetchUserInfoRequest: (state, action: PayloadAction<{ email: string; name: string; phone: string }>) => {},
		fetchUserInfoSuccess: (state, action: PayloadAction<{ message: string }>) => {
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		fetchUserInfoFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		clearMessages: state => {
			state.successMessage = "";
			state.error = null;
		},
	},
});

export const {
	fetchPasswordRequest,
	fetchPasswordSuccess,
	fetchPasswordFailure,
	updatePasswordRequest,
	updatePasswordSuccess,
	updatePasswordFailure,
	fetchUserInfoRequest,
	fetchUserInfoSuccess,
	fetchUserInfoFailure,
	clearMessages,
} = passwordSlice.actions;

export default passwordSlice.reducer;
