import { all, fork } from "redux-saga/effects";
import noticesSaga from "./sagas/noticesSaga";
import watchSubmitRegistration from "./sagas/registrationSaga";

function* rootSaga() {
	yield all([fork(noticesSaga), fork(watchSubmitRegistration)]);
}

export default rootSaga;
