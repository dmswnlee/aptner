import { all, call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";
import {
	fetchTermsFailure,
	fetchTermsStart,
	fetchTermsSuccess,
	submitRegistration,
	nextStep,
} from "@/stores/slice/registrationSlice";
import { RootState } from "@/stores/store";
import { SagaIterator } from "redux-saga";
import { Term } from "@/interfaces/Term";
import { RegistrationState } from "@/interfaces/RegistrationState";

function* fetchTermsSaga(): SagaIterator {
	try {
		const response = yield call(axios.get, `${process.env.NEXT_PUBLIC_API_URL}/terms`);
		const data: Term[] = response.data.result.termsInfoList;
		yield put(fetchTermsSuccess(data));
	} catch (error: any) {
		yield put(fetchTermsFailure(error.message));
	}
}

function* submitRegistrationSaga(): SagaIterator {
	try {
		const registrationData: RegistrationState = yield select((state: RootState) => state.registration);

		const requestData = {
			email: registrationData.accountInfo.email,
			name: registrationData.personalInfo.name,
			nickname: registrationData.addressInfo.nickname,
			password: registrationData.accountInfo.password,
			phone: registrationData.personalInfo.phoneNumber,
			verificationCode: registrationData.personalInfo.verificationCode,
			gender: registrationData.personalInfo.gender.toUpperCase(),
			apartment: {
				code: registrationData.addressInfo.code,
				apartDetailInfo: {
					dong: registrationData.addressInfo.apartDetailInfo.dong,
					ho: registrationData.addressInfo.apartDetailInfo.ho,
				},
			},
			termsAgreements: registrationData.termsAgreements,
		};

		console.log("Request Data:", requestData);

		const response = yield call(axios.post, `${process.env.NEXT_PUBLIC_API_URL}/members/sign-up`, requestData);
		yield put(nextStep());
		console.log("회원가입에 성공하셨습니다.", response.data);
	} catch (error: any) {
		console.error("회원가입에 실패하셨습니다.", error.message);
	}
}

function* watchFetchTerms() {
	yield takeEvery(fetchTermsStart.type, fetchTermsSaga);
}

function* watchSubmitRegistration() {
	yield takeEvery(submitRegistration.type, submitRegistrationSaga);
}

export default function* registrationSaga() {
	yield all([watchFetchTerms(), watchSubmitRegistration()]);
}
