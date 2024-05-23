import { all, fork } from "redux-saga/effects";
import noticesSaga from "./sagas/noticesSaga";
import watchSubmitRegistration from "./sagas/registrationSaga";
import disclosuresSaga from "./sagas/disclosuresSaga";

function* rootSaga() {
	yield all([fork(noticesSaga), fork(watchSubmitRegistration), fork(disclosuresSaga)]);
}

export default rootSaga;
