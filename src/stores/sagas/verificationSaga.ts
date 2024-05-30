import { all, call, put, takeLatest } from "redux-saga/effects";
import {
	sendVerificationRequest,
	sendVerificationSuccess,
	sendVerificationFailure,
	verifyCodeRequest,
	verifyCodeSuccess,
	verifyCodeFailure,
} from "../slice/verificationSlice";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { SendVerificationPayload, VerifyCodePayload } from '@/interfaces/VerificationState';

function* sendVerificationSaga(action: PayloadAction<SendVerificationPayload>): SagaIterator {
	try {
		const response = yield call(axios.get, `https://aptner.site/v1/api/members/send-verification`, {
			params: { phone: action.payload.phoneNumber },
		});
		const { code, expiredAt } = response.data.result;
		yield put(sendVerificationSuccess({ code, expiredAt }));
	} catch (error: any) {
		console.error("Send Verification Error:", error);
		yield put(sendVerificationFailure(error.message));
	}
}

function* verifyCodeSaga(action: PayloadAction<VerifyCodePayload>): SagaIterator {
	try {
		const response = yield call(axios.get, `https://aptner.site/v1/api/members/verify-code`, {
			params: { phone: action.payload.phoneNumber, verificationCode: action.payload.code },
		});
		const { verify } = response.data.result;
		if (verify) {
			yield put(verifyCodeSuccess());
		} else {
			yield put(verifyCodeFailure("Verification failed"));
		}
	} catch (error: any) {
		console.error("Verify Code Error:", error);
		yield put(verifyCodeFailure(error.message));
	}
}

function* watchFetchSendVerification() {
	yield takeLatest(sendVerificationRequest.type, sendVerificationSaga);
}

function* watchVerifyCode() {
	yield takeLatest(verifyCodeRequest.type, verifyCodeSaga);
}

export default function* verificationSaga() {
	yield all([watchFetchSendVerification(), watchVerifyCode()]);
}
