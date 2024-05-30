import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/interfaces/Post';

interface CommunicationState {
  posts: Post[];
  pinnedPosts: Post[]; //new
  loading: boolean;
  error: string | null;
  query: string;
  option: string;
}

const initialState: CommunicationState = {
  posts: [],
  pinnedPosts: [], //new
  loading: false,
  error: null,
  query: '',
  option: 'title_content',
};

const communicationsSlice = createSlice({
  name: 'communications',
  initialState,
  reducers: {
    fetchCommunicationsStart(state) {
      state.loading = true;
    },
    fetchCommunicationsSuccess(state, action: PayloadAction<{ posts: Post[], pinnedPosts: Post[] }>) {
      state.posts = action.payload.posts;
      state.pinnedPosts = action.payload.pinnedPosts;
      state.loading = false;
    },
    fetchCommunicationsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    searchCommunications(state) {
      state.loading = true;
    },
    searchCommunicationsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.loading = false;
    },
    searchCommunicationsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCommunicationsStart,
  fetchCommunicationsSuccess,
  fetchCommunicationsFailure,
  setQuery,
  setOption,
  searchCommunications,
  searchCommunicationsSuccess,
  searchCommunicationsFailure,
} = communicationsSlice.actions;

export default communicationsSlice.reducer;
