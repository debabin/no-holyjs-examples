import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export type Stage = 'confirmation' | 'selectConfirmation' | 'signIn' | 'signUp';

interface StageState {
  value: Stage;
}

const initialState: StageState = { value: 'signIn' } satisfies StageState;

export const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    setStage(state, action: PayloadAction<Stage>) {
      state.value = action.payload;
    }
  }
});
