import { createAction } from '@reduxjs/toolkit';
import type { SagaReturnType } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';

import { authActions, authSelectors } from '../slices';
import { otpCountdownSlice } from '../slices/otpCountdown/slice';

export const action = createAction('auth.onOtpResend');

export type OnResendOtpAction = SagaAction<typeof action.type>;

export function* saga() {
  try {
    const otp: SagaReturnType<typeof authSelectors.getOtp> = yield select(authSelectors.getOtp);

    const postOtp =
      otp.type === 'email' ? apiSlice.endpoints.postOtpEmail : apiSlice.endpoints.postOtpPhone;

    const postOtpResponse: SagaReturnType<typeof postOtp.initiate> = yield call(postOtp.initiate, {
      params: { [otp.type]: otp.resource } as Record<'email' | 'phone', string>
    });

    if (postOtpResponse.data.retryDelay) {
      yield call(otpCountdownSlice.startCountdown, postOtpResponse.data.retryDelay / 1000);

      yield put(
        authActions.setOtp({
          retryDelay: postOtpResponse.data.retryDelay
        })
      );

      yield put(authActions.setStage('confirmation'));
    }
  } catch (error) {
    console.error(error);
  }
}

export const onOtpResend = {
  saga,
  action
};
