import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdState {
	email: string;
	error: string | null;
}

const initialState: IdState = {
	email: "",
	error: null,
};

const idSlice = createSlice({
	name: "id",
	initialState,
	reducers: {
		fetchIdRequest: (state, action: PayloadAction<{ name: string; phone: string }>) => {},
		fetchIdSuccess: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			state.error = null;
		},
		fetchIdFailure: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		resetIdState: state => {
			state.email = "";
			state.error = null;
		},
	},
});

export const { fetchIdRequest, fetchIdSuccess, fetchIdFailure, resetIdState } = idSlice.actions;
export default idSlice.reducer;
