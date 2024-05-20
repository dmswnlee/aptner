import { call, put, takeEvery } from "redux-saga/effects";
import { setNotices, fetchNotices } from "@/stores/slice/noticesSlice";

interface Notice {
	id: number;
	isPin: boolean;
	category: string;
	title: string;
	author: string;
	views: number;
	date: string;
}

function* fetchNoticesSaga() {
	try {
		const response: Response = yield call(fetch, "http://localhost:9090/api/notices");
		const data: Notice[] = yield response.json();
		yield put(setNotices(data));
	} catch (error) {
		console.error("fetchNoticesSaga error:", error);
	}
}

export default function* noticesSaga() {
	yield takeEvery(fetchNotices.type, fetchNoticesSaga);
}
