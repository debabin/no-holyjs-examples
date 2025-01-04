import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export interface SelectState {
  id: GithubCard['id'] | null;
  offset: {
    x: number;
    y: number;
  };
}

const initialState: SelectState = {
  id: null,
  offset: {
    x: 0,
    y: 0
  }
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setSelect(state, action: PayloadAction<Partial<SelectState>>) {
      Object.assign(state, action.payload);
    }
  }
});
