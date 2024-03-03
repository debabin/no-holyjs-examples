import { combineSlices } from '@reduxjs/toolkit';

import { otpSlice } from './otp/slice';
import { otpCountdownSlice } from './otpCountdown/slice';
import { stageSlice } from './stage/slice';

export const authPrefix = 'auth';

export const authReducer = combineSlices(stageSlice, otpSlice, otpCountdownSlice);
export const authReducerSlices = [stageSlice, otpSlice];
export const authActions = {
  otpTimer: otpCountdownSlice.actions,
  ...stageSlice.actions,
  ...otpSlice.actions
};

declare module '@redux-thunk-variant/redux/reducer' {
  interface LazyLoadedSlices {
    auth: SliceState<typeof authReducer>;
  }
}

export * as authSelectors from './selectors';
