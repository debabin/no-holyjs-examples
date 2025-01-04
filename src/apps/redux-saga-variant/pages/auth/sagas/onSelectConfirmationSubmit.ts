import type { SagaReturnType } from 'redux-saga/effects';

import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';

import { authActions } from '../slices';

export interface OnSelectConfirmationSubmitPayload {
  selectedResource: 'email' | 'phone';
  values: {
    resource: string;
  };
}

export const action = createAction<OnSelectConfirmationSubmitPayload>(
  'auth.onSelectConfirmationSubmit'
);

export type OnSelectConfirmationSubmitAction = SagaAction<
  typeof action.type,
  OnSelectConfirmationSubmitPayload
>;

export function* saga(action: OnSelectConfirmationSubmitAction) {
  try {
    const { values, selectedResource } = action.payload;

    const postOtp =
      selectedResource === 'email'
        ? apiSlice.endpoints.postOtpEmail
        : apiSlice.endpoints.postOtpPhone;

    const postOtpResponse: SagaReturnType<typeof postOtp.initiate> = yield call(postOtp.initiate, {
      params: { [selectedResource]: values.resource } as Record<'email' | 'phone', string>
    });

    if (postOtpResponse.data.retryDelay) {
      yield put(
        authActions.setOtp({
          type: selectedResource,
          resource: values.resource,
          retryDelay: postOtpResponse.data.retryDelay
        })
      );

      yield put(authActions.setStage('confirmation'));
    }
  } catch (error) {
    console.error(error);
  }
}

export const onSelectConfirmationSubmit = {
  saga,
  action
};
