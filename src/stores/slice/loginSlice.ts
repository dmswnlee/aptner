import { LoginState } from '@/interfaces/LoginState';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoginState = {
	email: "",
	password: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setLoginData: (state, action: PayloadAction<{ email: string; password: string }>) => {
			state.email = action.payload.email;
			state.password = action.payload.password;
		},
		logout: state => {
			state.email = "";
			state.password = "";
		},
	},
});

export const { setLoginData, logout } = loginSlice.actions;

export default loginSlice.reducer;
