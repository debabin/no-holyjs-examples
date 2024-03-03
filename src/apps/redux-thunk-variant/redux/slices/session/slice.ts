import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  isAuthenticated: false
} satisfies SessionState;

export const name = 'session';
export const sessionSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    }
  },
  selectors: {
    getIsAuthenticated: (state) => state.isAuthenticated
  }
});
