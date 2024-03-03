import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';

import { stageSlice } from '../slices/stage/slice';

export interface OnSignUpSubmitPayload {
  values: {
    email: string;
    password: string;
    passwordConfirmation: string;
    login: string;
    firstName?: string;
    lastName?: string;
    country: {
      id: number;
      label: string;
      code: string;
    };
  };
}

export const action = createAction<OnSignUpSubmitPayload>('auth.onSignUpSubmit');

export const thunk = createAsyncThunk<void, OnSignUpSubmitPayload>(
  action.type,
  async (payload, { dispatch }) => {
    const {
      values: { passwordConfirmation, ...values }
    } = payload;

    await dispatch(apiSlice.endpoints.postSignUp.thunk({ params: values }));

    toast.success('Your account has been created 👍', {
      cancel: { label: 'Close' },
      description: 'We are very glad to see you, have fun'
    });

    dispatch(stageSlice.actions.setStage('signIn'));
  }
);

export const onSignUpSubmit = {
  thunk,
  action
};
