import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { store } from './store';

interface CountdownState {
  status: 'running' | 'waiting';
  seconds: number;
  id?: NodeJS.Timeout;
}

interface CreateCountdownSliceParams<Name> {
  name: Name;
}

export const createCountdownSlice = <const Name extends string>({
  name
}: CreateCountdownSliceParams<Name>) => {
  const initialState: CountdownState = {
    seconds: 0,
    status: 'waiting'
  };

  const countdownSlice = createSlice({
    name,
    initialState,
    reducers: {
      setCountdownId: (state, action: PayloadAction<CountdownState['id']>) => {
        state.id = action.payload;
      },
      startCountdown: (state, action: PayloadAction<number>) => {
        state.status = 'running';
        state.seconds = action.payload;
      },

      decrementSeconds: (state) => {
        state.seconds -= 1;

        if (state.seconds === 0) {
          state.status = 'waiting';
          clearInterval(state.id);
          state.id = undefined;
        }
      }
    }
  });

  const startCountdown = (time: number) => {
    const countdownId = setInterval(
      () => store.dispatch(countdownSlice.actions.decrementSeconds()),
      1000
    );
    store.dispatch(countdownSlice.actions.startCountdown(time));
    store.dispatch(countdownSlice.actions.setCountdownId(countdownId));
  };

  return { ...countdownSlice, startCountdown };
};
