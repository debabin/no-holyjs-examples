import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';
import { profileSlice } from '@/apps/redux-thunk-variant/redux/slices/profile/slice';
import { sessionSlice } from '@/apps/redux-thunk-variant/redux/slices/session/slice';
import { router } from '@/apps/redux-thunk-variant/router';
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

export const thunk = createAsyncThunk<void, OnSignInSubmitPayload>(
  action.type,
  async (payload, { dispatch }) => {
    try {
      const { resource, values } = payload;

      if (resource === 'email') {
        const postOtpEmailResponse = await dispatch(
          apiSlice.endpoints.postOtpEmail.initiate({
            params: { email: values.login }
          })
        ).unwrap();

        if (!postOtpEmailResponse.data.retryDelay) return;

        dispatch(
          authActions.setOtp({
            type: 'email',
            resource: values.login,
            retryDelay: postOtpEmailResponse.data.retryDelay
          })
        );

        otpCountdownSlice.startCountdown(postOtpEmailResponse.data.retryDelay / 1000);

        dispatch(authActions.setStage('confirmation'));
        return;
      }

      const postSignInLoginResponse = await dispatch(
        apiSlice.endpoints.postSignInLogin.initiate({
          params: {
            [resource]: values.login,
            ...(resource === 'login' && { password: values.password })
          } as Record<'email' | 'login', string>
        })
      ).unwrap();

      if (
        'needConfirmation' in postSignInLoginResponse.data &&
        postSignInLoginResponse.data.needConfirmation &&
        resource === 'login'
      ) {
        dispatch(authActions.setStage('selectConfirmation'));
        return;
      }

      if ('profile' in postSignInLoginResponse.data) {
        localStorage.setItem(COOKIE.ACCESS_TOKEN, postSignInLoginResponse.data.token);

        dispatch(profileSlice.actions.setProfile(postSignInLoginResponse.data.profile));
        dispatch(sessionSlice.actions.setSession(true));

        toast.success('Sign in is successful 👍', {
          cancel: { label: 'Close' },
          description: 'We are very glad to see you, have fun'
        });

        router.navigate({
          to: '/',
          replace: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const onSignInSubmit = {
  thunk,
  action
};
