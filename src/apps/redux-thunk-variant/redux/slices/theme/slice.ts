import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';
interface ThemeState {
  value: Theme;
}

const initialState: ThemeState = {
  value: 'light'
} satisfies ThemeState;

export const name = 'theme';
export const themeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    }
  },
  selectors: {
    getTheme: (state) => state.value
  }
});
