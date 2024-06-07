import { PasswordGetPayload, PasswordPayload, UpdatePasswordPayload } from "./../../interfaces/FindIdPassword";
import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchIdRequest, fetchIdSuccess, fetchIdFailure } from "@/stores/slice/idSlice";
import { SagaIterator } from "redux-saga";
import {
	fetchUserInfoFailure,
	fetchUserInfoRequest,
	fetchUserInfoSuccess,
	updatePasswordRequest,
	updatePasswordFailure,
	updatePasswordSuccess,
} from "../slice/passwordSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchId(action: PayloadAction<PasswordPayload>): SagaIterator {
	try {
		const { name, phone } = action.payload;
		const response = yield call(axios.get, `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/auth/email`, {
			params: { name, phone },
		});
		if (response.data.result && response.data.result.email) {
			yield put(fetchIdSuccess(response.data.result.email));
		}
	} catch (error) {
		yield put(fetchIdFailure("검색되는 회원이 없습니다."));
	}
}

function* fetchPasswordSaga(action: PayloadAction<UpdatePasswordPayload>): SagaIterator {
	try {
		const response = yield call(
			axios.patch,
			`${process.env.NEXT_PUBLIC_API_URL}/members/RO000/auth/password`,
			action.payload,
		);
		yield put(updatePasswordSuccess(response.data));
	} catch (error: any) {
		console.log("에러:", error.response.data.message);
		yield put(updatePasswordFailure(error.response.data.message));
	}
}

function* fetchUserInfoSaga(action: PayloadAction<PasswordGetPayload>): SagaIterator {
	try {
		const { email, name, phone } = action.payload;
		const response = yield call(axios.get, `${process.env.NEXT_PUBLIC_API_URL}/members/RO000/auth/check-email`, {
			params: { email, name, phone },
		});
		if (response.data.success) {
			yield put(fetchUserInfoSuccess({ message: "회원정보가 확인되었습니다." }));
		}
	} catch (error: any) {
		yield put(fetchUserInfoFailure(error.response?.data?.message || "검색되는 회원이 없습니다."));
	}
}

function* idSaga() {
	yield takeLatest(fetchIdRequest.type, fetchId);
}

function* passwordSaga() {
	yield takeLatest(updatePasswordRequest.type, fetchPasswordSaga);
	yield takeLatest(fetchUserInfoRequest.type, fetchUserInfoSaga);
}

export default function* findIdPasswordSaga() {
	yield all([idSaga(), passwordSaga()]);
}
