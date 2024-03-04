import { createAction } from '@reduxjs/toolkit';
import type { SagaReturnType } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';
import { profileSlice } from '@/apps/redux-saga-variant/redux/slices/profile/slice';
import { sessionSlice } from '@/apps/redux-saga-variant/redux/slices/session/slice';
import { router } from '@/apps/redux-saga-variant/router';
import { COOKIE } from '@/utils/constants';

import { authSelectors } from '../slices';

export interface OnConfirmationSubmitPayload {
  values: {
    otp: string;
  };
}

export const action = createAction<OnConfirmationSubmitPayload>('auth.onConfirmationSubmit');

export type OnConfirmationSubmitAction = SagaAction<
  typeof action.type,
  OnConfirmationSubmitPayload
>;

export function* saga(action: OnConfirmationSubmitAction) {
  try {
    const { values } = action.payload;

    const otp: SagaReturnType<typeof authSelectors.getOtp> = yield select(authSelectors.getOtp);

    const postTwoFactorAuthenticationResponse: SagaReturnType<
      typeof apiSlice.endpoints.postTwoFactorAuthentication.initiate
    > = yield call(apiSlice.endpoints.postTwoFactorAuthentication.initiate, {
      params: {
        otp: values.otp,
        source: otp.resource
      }
    });

    if ('profile' in postTwoFactorAuthenticationResponse.data) {
      yield localStorage.setItem(
        COOKIE.ACCESS_TOKEN,
        postTwoFactorAuthenticationResponse.data.token
      );

      yield put(profileSlice.actions.setProfile(postTwoFactorAuthenticationResponse.data.profile));
      yield put(sessionSlice.actions.setSession(true));

      yield router.navigate({
        to: '/',
        replace: true
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const onConfirmationSubmit = {
  saga,
  action
};
