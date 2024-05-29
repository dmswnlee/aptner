import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Communications 인터페이스 정의
interface Communications {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

// Redux 상태 인터페이스 정의
interface CommunicationsState {
  communications: Communications[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  query: string;
  option: string;
}

// 초기 상태 정의
const initialState: CommunicationsState = {
  communications: [],
  status: 'idle',
  error: null,
  query: '',
  option: '',
};

// Redux slice 생성
const communicationsSlice = createSlice({
  name: 'communications',
  initialState,
  reducers: {
    // 데이터를 설정하고 상태를 성공으로 변경
    setCommunications(state, action: PayloadAction<Communications[]>) {
      state.communications = action.payload;
      state.status = 'succeeded';
    },
    // 데이터를 로딩 중으로 설정
    fetchCommunications(state) {
      state.status = 'loading';
    },
    // 데이터 로딩 실패 시 에러 메시지를 설정
    fetchCommunicationsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    // 검색 쿼리를 설정
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    // 검색 옵션을 설정
    setOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    // 검색을 로딩 중으로 설정
    searchCommunications(state) {
      state.status = 'loading';
    },
  },
});

export const {
  setCommunications,
  fetchCommunications,
  fetchCommunicationsFailed,
  setQuery,
  setOption,
  searchCommunications,
} = communicationsSlice.actions;

export default communicationsSlice.reducer;
