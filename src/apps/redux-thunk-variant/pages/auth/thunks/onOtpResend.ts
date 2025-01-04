import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/apps/redux-thunk-variant/redux/store';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';

import { authActions, authSelectors } from '../slices';
import { otpCountdownSlice } from '../slices/otpCountdown/slice';

export const action = createAction('auth.onOtpResend');

export type OnResendOtpAction = SagaAction<typeof action.type>;

export const thunk = createAsyncThunk<void, void, { state: RootState }>(
  action.type,
  async (_, { dispatch, getState }) => {
    try {
      const state = getState();
      const otp = authSelectors.getOtp(state);

      const postOtp =
        otp.type === 'email' ? apiSlice.endpoints.postOtpEmail : apiSlice.endpoints.postOtpPhone;

      const postOtpResponse = await postOtp.initiate({
        params: { [otp.type]: otp.resource } as Record<'email' | 'phone', string>
      });

      if (postOtpResponse.data.retryDelay) {
        otpCountdownSlice.startCountdown(postOtpResponse.data.retryDelay / 1000);

        dispatch(
          authActions.setOtp({
            retryDelay: postOtpResponse.data.retryDelay
          })
        );

        dispatch(authActions.setStage('confirmation'));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const onOtpResend = {
  thunk,
  action
};
