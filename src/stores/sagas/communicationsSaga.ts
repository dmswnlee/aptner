import { call, put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { fetchCommunications, setCommunications } from "@/stores/slice/communicationsSlice";

interface Communications {
	id: number;
	isPin: boolean;
	category: string;
	title: string;
	author: string;
	views: number;
	date: string;
}

function* fetchCommunicationsSaga() {
	try {
		const response: AxiosResponse<Communications[]> = yield call(axios.get, "http://localhost:9090/api/communications");
		const data: Communications[] = response.data;
		yield put(setCommunications(data));
	} catch (error) {
		console.error("fetchCommunicationsSaga error:", error);
		// Optionally, you can dispatch an error action here
	}
} 

export default function* communicationsSaga() {
	yield takeEvery(fetchCommunications.type, fetchCommunicationsSaga);
}
