import { createAction } from '@reduxjs/toolkit';
import type { SagaReturnType } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { toast } from 'sonner';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';
import { profileSlice } from '@/apps/redux-saga-variant/redux/slices/profile/slice';
import { sessionSlice } from '@/apps/redux-saga-variant/redux/slices/session/slice';
import { router } from '@/apps/redux-saga-variant/router';
import { COOKIE } from '@/utils/constants';

import { authActions } from '../slices';
import { otpCountdownSlice } from '../slices/otpCountdown/slice';

export interface OnSignInSubmitPayload {
  resource: 'email' | 'login';
  values: {
    login: string;
    password: string;
  };
}

export const action = createAction<OnSignInSubmitPayload>('auth.onSignInSubmit');

export type OnSignInSubmitAction = SagaAction<typeof action.type, OnSignInSubmitPayload>;

export function* saga(action: OnSignInSubmitAction) {
  try {
    const { resource, values } = action.payload;

    if (resource === 'email') {
      const postOtpEmailApiResponse: SagaReturnType<typeof apiSlice.endpoints.postOtpEmail.call> =
        yield call(apiSlice.endpoints.postOtpEmail.call, {
          params: { email: values.login }
        });

      if (!postOtpEmailApiResponse.data.retryDelay) return;

      yield put(
        authActions.setOtp({
          type: 'email',
          resource: values.login,
          retryDelay: postOtpEmailApiResponse.data.retryDelay
        })
      );

      yield call(otpCountdownSlice.startCountdown, postOtpEmailApiResponse.data.retryDelay / 1000);

      yield put(authActions.setStage('confirmation'));
      return;
    }

    const postSignInLoginApiResponse: SagaReturnType<
      typeof apiSlice.endpoints.postSignInLogin.call
    > = yield call(apiSlice.endpoints.postSignInLogin.call, {
      params: {
        [resource]: values.login,
        ...(resource === 'login' && { password: values.password })
      } as Record<'email' | 'login', string>
    });

    if (
      'needConfirmation' in postSignInLoginApiResponse.data &&
      postSignInLoginApiResponse.data.needConfirmation &&
      resource === 'login'
    ) {
      yield put(authActions.setStage('selectConfirmation'));
      return;
    }

    if ('profile' in postSignInLoginApiResponse.data) {
      localStorage.setItem(COOKIE.ACCESS_TOKEN, postSignInLoginApiResponse.data.token);

      yield put(profileSlice.actions.setProfile(postSignInLoginApiResponse.data.profile));
      yield put(sessionSlice.actions.setSession(true));

      yield toast.success('Sign in is successful 👍', {
        cancel: { label: 'Close' },
        description: 'We are very glad to see you, have fun'
      });

      yield router.navigate({
        to: '/',
        replace: true
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const onSignInSubmit = {
  saga,
  action
};
