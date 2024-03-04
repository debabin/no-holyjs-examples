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
      const postOtpEmailResponse: SagaReturnType<typeof apiSlice.endpoints.postOtpEmail.initiate> =
        yield call(apiSlice.endpoints.postOtpEmail.initiate, {
          params: { email: values.login }
        });

      if (!postOtpEmailResponse.data.retryDelay) return;

      yield put(
        authActions.setOtp({
          type: 'email',
          resource: values.login,
          retryDelay: postOtpEmailResponse.data.retryDelay
        })
      );

      yield call(otpCountdownSlice.startCountdown, postOtpEmailResponse.data.retryDelay / 1000);

      yield put(authActions.setStage('confirmation'));
      return;
    }

    const postSignInLoginResponse: SagaReturnType<
      typeof apiSlice.endpoints.postSignInLogin.initiate
    > = yield call(apiSlice.endpoints.postSignInLogin.initiate, {
      params: {
        [resource]: values.login,
        ...(resource === 'login' && { password: values.password })
      } as Record<'email' | 'login', string>
    });

    if (
      'needConfirmation' in postSignInLoginResponse.data &&
      postSignInLoginResponse.data.needConfirmation &&
      resource === 'login'
    ) {
      yield put(authActions.setStage('selectConfirmation'));
      return;
    }

    if ('profile' in postSignInLoginResponse.data) {
      localStorage.setItem(COOKIE.ACCESS_TOKEN, postSignInLoginResponse.data.token);

      yield put(profileSlice.actions.setProfile(postSignInLoginResponse.data.profile));
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
