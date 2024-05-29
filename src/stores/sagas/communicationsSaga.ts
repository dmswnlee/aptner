import { call, put, takeEvery, select } from "redux-saga/effects";
import axios, { AxiosResponse } from 'axios';
import {
  fetchCommunications,
  setCommunications,
  fetchCommunicationsFailed,
  searchCommunications,
} from "@/stores/slice/communicationsSlice";
import { RootState } from "@/stores/store";

interface Communications {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

// Redux 상태에서 query와 option 값을 가져오는 셀렉터 함수
const getQuery = (state: RootState) => state.communications.query;
const getOption = (state: RootState) => state.communications.option;

// 데이터를 가져오고 정렬하는 함수
function* fetchAndSortCommunications(url: string, params?: any) {
  try {
    const response: AxiosResponse<Communications[]> = yield call(axios.get, url, { params });
    let data: Communications[] = response.data;

    // isPin(중요글) 값으로 먼저 정렬하고, 날짜로 내림차순 정렬
    data = data.sort((a, b) => {
      if (a.isPin === b.isPin) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.isPin ? -1 : 1;
    });

    // 정렬된 데이터를 Redux 상태에 저장
    yield put(setCommunications(data));
  } catch (error) {
    console.error("fetchAndSortCommunications error:", error);
    if (axios.isAxiosError(error)) {
      yield put(fetchCommunicationsFailed(error.message));
    } else {
      yield put(fetchCommunicationsFailed("An unknown error occurred"));
    }
  }
}

// 전체 커뮤니케이션 데이터를 가져오기
function* fetchCommunicationsSaga() {
  yield call(fetchAndSortCommunications, "http://localhost:9090/api/communications");
}

// 검색된 커뮤니케이션 데이터를 가져오기
function* searchCommunicationsSaga() {
  const query: string = 
  yield select(getQuery);
  const option: string = yield select(getOption);
  yield call(fetchAndSortCommunications, "http://localhost:9090/api/communications/search", { query, option });
}

// saga들을 관리하는 rootSaga
export default function* communicationsSaga() {
  yield takeEvery(fetchCommunications.type, fetchCommunicationsSaga);
  yield takeEvery(searchCommunications.type, searchCommunicationsSaga);
}
