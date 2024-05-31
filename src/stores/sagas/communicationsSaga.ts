import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCommunicationsStart,
  fetchCommunicationsSuccess,
  fetchCommunicationsFailure,
  searchCommunications,
  searchCommunicationsSuccess,
  searchCommunicationsFailure,
} from '@/stores/slice/communicationsSlice';
import { Post } from '@/interfaces/Post';

const getQuery = (state: any) => state.communications.query;
const getOption = (state: any) => state.communications.option;

function* fetchCommunicationsSaga(): any {
  try {
    yield put(fetchCommunicationsStart());
    const response = yield call(axios.get, 'http://localhost:9090/api/posts');
    const { posts, pinnedPost } = response.data.result.result;
    yield put(fetchCommunicationsSuccess({ posts, pinnedPosts: pinnedPost }));
  } catch (error: any) {
    yield put(fetchCommunicationsFailure(error.message));
  }
} //new


function* searchCommunicationsSaga(): any {
  try {
    const query = yield select(getQuery);
    const option = yield select(getOption);
    const response = yield call(axios.get, `http://localhost:9090/api/posts/search?query=${query}&option=${option}`);
    yield put(searchCommunicationsSuccess(response.data.result.$domainList as Post[]));
  } catch (error: any) {
    yield put(searchCommunicationsFailure(error.message));
  }
}

export function* watchFetchCommunications() {
  yield takeLatest('communications/fetchCommunications', fetchCommunicationsSaga);
}

export function* watchSearchCommunications() {
  yield takeLatest('communications/searchCommunications', searchCommunicationsSaga);
}
