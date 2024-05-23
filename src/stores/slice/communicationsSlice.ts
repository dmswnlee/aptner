import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 공개 정보(Disclosure)에 대한 인터페이스를 정의합니다.
interface Communications {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

// 상태를 관리하기 위한 인터페이스를 정의합니다.
interface CommunicationsState {
  communications: Communications[]; // 공개 정보 배열
}

// 초기 상태를 정의합니다.
const initialState: CommunicationsState = {
  communications: [], // 초기에는 공개 정보가 없는 상태로 설정됩니다.
};

// createSlice 함수를 사용하여 slice를 생성합니다.
const communicationsSlice = createSlice({
  name: 'communications', // slice의 이름을 지정합니다.
  initialState, // 초기 상태를 지정합니다.
  reducers: {
    // 공개 정보를 설정하는 액션입니다.
    setCommunications(state, action: PayloadAction<Communications[]>) {
      state.communications = action.payload; // 새로운 공개 정보로 상태를 업데이트합니다.
    },
    // 공개 정보를 가져오는 액션입니다. (비동기 작업이므로 별도의 미들웨어가 필요합니다.)
    fetchCommunications() {},
  },
});

// 액션 생성자들을 내보냅니다.
export const { setCommunications, fetchCommunications } = communicationsSlice.actions;

// 리듀서를 내보냅니다.
export default communicationsSlice.reducer;
