import { all, fork } from "redux-saga/effects";
import noticesSaga from "./sagas/noticesSaga";
import disclosuresSaga from "./sagas/disclosuresSaga";
import { watchFetchCommunications, watchSearchCommunications } from "./sagas/communicationsSaga";
import registrationSaga from "./sagas/registrationSaga";
import verificationSaga from "./sagas/verificationSaga";

function* rootSaga() {
	yield all([
		fork(noticesSaga),
		fork(registrationSaga),
		fork(verificationSaga),
		fork(disclosuresSaga),
		fork(watchFetchCommunications),
		fork(watchSearchCommunications) 
	]);

export default rootSaga;
