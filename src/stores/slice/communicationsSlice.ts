import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Communications {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

// State interface
interface CommunicationsState {
  communications: Communications[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CommunicationsState = {
  communications: [],
  status: 'idle',
  error: null,
};

// Create the slice
const communicationsSlice = createSlice({
  name: 'communications',
  initialState,
  reducers: {
    setCommunications(state, action: PayloadAction<Communications[]>) {
      state.communications = action.payload;
      state.status = 'succeeded';
    },
    fetchCommunications(state) {
      state.status = 'loading';
    },
    fetchCommunicationsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export the actions
export const { setCommunications, fetchCommunications, fetchCommunicationsFailed } = communicationsSlice.actions;

// Export the reducer
export default communicationsSlice.reducer;
