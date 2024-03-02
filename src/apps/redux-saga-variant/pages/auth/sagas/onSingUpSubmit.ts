import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { toast } from 'sonner';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';

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

export type OnSignUpSubmitAction = SagaAction<typeof action.type, OnSignUpSubmitPayload>;

export function* saga(action: OnSignUpSubmitAction) {
  try {
    const {
      values: { passwordConfirmation, ...values }
    } = action.payload;

    yield call(apiSlice.endpoints.postSignUp.call, { params: values });

    toast.success('Your account has been created 👍', {
      cancel: { label: 'Close' },
      description: 'We are very glad to see you, have fun'
    });

    yield put(stageSlice.actions.setStage('signIn'));
  } catch (error) {
    console.error(error);
  }
}

export const onSignUpSubmit = {
  saga,
  action
};
