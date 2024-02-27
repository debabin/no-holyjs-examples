import { combineSlices } from '@reduxjs/toolkit';

import { otpSlice } from './otp/slice';
import { signInForm } from './signInForm/slice';
import { stageSlice } from './stage/slice';

export const authPrefix = 'auth';
export const authReducer = combineSlices(stageSlice, otpSlice, signInForm.slice);

export const authActions = {
  ...stageSlice.actions,
  ...otpSlice.actions
};
