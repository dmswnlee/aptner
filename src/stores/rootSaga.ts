import { all, fork } from "redux-saga/effects";
import noticesSaga from "./sagas/noticesSaga";
import watchSubmitRegistration from "./sagas/registrationSaga";
import disclosuresSaga from "./sagas/disclosuresSaga";
import { watchFetchCommunications, watchSearchCommunications } from "./sagas/communicationsSaga";

function* rootSaga() {
	yield all([
		fork(noticesSaga),
		fork(watchSubmitRegistration),
		fork(disclosuresSaga),
		fork(watchFetchCommunications),
		fork(watchSearchCommunications) 
	]);
}

export default rootSaga;
