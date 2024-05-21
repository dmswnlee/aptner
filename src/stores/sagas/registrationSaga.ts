import { all, call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTermsFailure,
  fetchTermsStart,
  fetchTermsSuccess,
  submitRegistration,
  nextStep,
	RegistrationState,
} from '../slice/registrationSlice';
import { RootState } from '../store';

interface Term {
  id: number;
  title: string;
  content: string;
  type: string;
  isRequired: boolean;
}

// TODO : 일단 fetch 사용 추후 axios로 변경예정
function* fetchTermsSaga() {
	try {
		const response: Response = yield call(fetch, "http://localhost:9090/api/terms");
		const data: Term[] = yield response.json();
		yield put(fetchTermsSuccess(data));
	} catch (error : any) {
		yield put(fetchTermsFailure(error.message));
	}
}

function* handleRegistration() {
  try {
    const registrationData : RegistrationState = yield select((state: RootState) => state.registration);
    const response : Response = yield call(axios.post, "http://localhost:9090/api/submit", {
      email: registrationData.accountInfo.email,
      name: registrationData.personalInfo.name,
      nickname: registrationData.accountInfo.nickname,
      password: registrationData.accountInfo.password,
      phone: registrationData.personalInfo.phoneNumber,
      gender: registrationData.personalInfo.gender,
      apartment: {
        code: registrationData.addressInfo.code,
        apartDetailInfo: {
          dong: registrationData.addressInfo.dong,
          ho: registrationData.addressInfo.ho
        }
      },
      termsAgreements: registrationData.termsAgreements
    });
    if (response.status === 200) {
      yield put(nextStep());
      console.log('회원가입이 완료되었습니다.');
    }
  } catch (e) {
    console.log('회원가입에 실패했습니다.');
  }
}

function* watchFetchTerms() {
  yield takeEvery(fetchTermsStart.type, fetchTermsSaga);
}

function* watchSubmitRegistration() {
  yield takeEvery(submitRegistration.type, handleRegistration);
}

export default function* registrationSaga() {
  yield all([
    watchFetchTerms(),
    watchSubmitRegistration(),
  ]);
}
