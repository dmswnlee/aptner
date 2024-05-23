import { call, put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { setDisclosures, fetchDisclosures } from "@/stores/slice/disclosuresSlice";

interface Disclosure {
	id: number;
	isPin: boolean;
	category: string;
	title: string;
	author: string;
	views: number;
	date: string;
}

function* fetchDisclosuresSaga() {
	try {
		const response: AxiosResponse<Disclosure[]> = yield call(axios.get, "http://localhost:9090/api/disclosures");
		const data: Disclosure[] = response.data;
		yield put(setDisclosures(data));
	} catch (error) {
		console.error("fetchDisclosuresSaga error:", error);
		// Optionally, you can dispatch an error action here
	}
} 

export default function* disclosuresSaga() {
	yield takeEvery(fetchDisclosures.type, fetchDisclosuresSaga);
}
