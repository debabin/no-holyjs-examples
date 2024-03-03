import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';
import { profileSlice } from '@/apps/redux-thunk-variant/redux/slices/profile/slice';
import { sessionSlice } from '@/apps/redux-thunk-variant/redux/slices/session/slice';
import type { RootState } from '@/apps/redux-thunk-variant/redux/store';
import { router } from '@/apps/redux-thunk-variant/router';
import { COOKIE } from '@/utils/constants';

import { authSelectors } from '../slices';

export interface OnConfirmationSubmitPayload {
  values: {
    otp: string;
  };
}

export const action = createAction<OnConfirmationSubmitPayload>('auth.onConfirmationSubmit');

export const thunk = createAsyncThunk<void, OnConfirmationSubmitPayload, { state: RootState }>(
  action.type,
  async (payload, { dispatch, getState }) => {
    try {
      const state = getState();

      const { values } = payload;
      const otp = authSelectors.getOtp(state);

      const postTwoFactorAuthenticationResponse = await dispatch(
        apiSlice.endpoints.postTwoFactorAuthentication.thunk({
          params: {
            otp: values.otp,
            source: otp.resource
          }
        })
      ).unwrap();

      if ('profile' in postTwoFactorAuthenticationResponse.data) {
        localStorage.setItem(COOKIE.ACCESS_TOKEN, postTwoFactorAuthenticationResponse.data.token);

        dispatch(profileSlice.actions.setProfile(postTwoFactorAuthenticationResponse.data.profile));
        dispatch(sessionSlice.actions.setSession(true));

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

export const onConfirmationSubmit = {
  thunk,
  action
};
