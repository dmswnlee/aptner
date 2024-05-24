import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Disclosure {
  id: number;
  isPin: boolean;
  category: string;
  title: string;
  author: string;
  views: number;
  date: string;
}

interface DisclosuresState {
  disclosures: Disclosure[];
}

const initialState: DisclosuresState = {
  disclosures: [],
};

const disclosuresSlice = createSlice({
  name: 'disclosures',
  initialState,
  reducers: {
    setDisclosures(state, action: PayloadAction<Disclosure[]>) {
      state.disclosures = action.payload;
    },
    fetchDisclosures() {},
  },
});

export const { setDisclosures, fetchDisclosures } = disclosuresSlice.actions;
export default disclosuresSlice.reducer;
