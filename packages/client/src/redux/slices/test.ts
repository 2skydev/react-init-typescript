import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TTestState = {
  count: number;
};

const initialState: TTestState = {
  count: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<number>) {
      state.count += action.payload || 1;
    },

    decrease(state, action: PayloadAction<number>) {
      state.count += (action.payload || 1) * -1;
    },
  },
});

export const { increase, decrease } = testSlice.actions;
export default testSlice.reducer;
