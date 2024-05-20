import { all } from "redux-saga/effects";
import noticesSaga from "./sagas/noticesSaga";

function* rootSaga() {
	yield all([noticesSaga()]);
}

export default rootSaga;
