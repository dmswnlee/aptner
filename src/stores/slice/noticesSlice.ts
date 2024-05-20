import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notice {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

interface NoticesState {
  notices: Notice[];
}

const initialState: NoticesState = {
  notices: [],
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setNotices(state, action: PayloadAction<Notice[]>) {
      state.notices = action.payload;
    },
    fetchNotices() {},
  },
});

export const { setNotices, fetchNotices } = noticesSlice.actions;
export default noticesSlice.reducer;
