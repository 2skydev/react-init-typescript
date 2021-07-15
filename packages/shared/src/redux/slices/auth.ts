import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  count: number;
}

const initialState: IAuthState = {
  count: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<number>) {
      state.count += action.payload || 1;
    },
  },
});

export const { increase } = authSlice.actions;
export default authSlice.reducer;
