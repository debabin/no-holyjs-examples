import { createAction } from '@reduxjs/toolkit';
import type { SagaReturnType } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';

import { authActions } from '../slices';

export interface OnSelectConfirmationSubmitPayload {
  selectedResource: 'phone' | 'email';
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

    const postOtpMutation =
      selectedResource === 'email'
        ? apiSlice.endpoints.postOtpEmail
        : apiSlice.endpoints.postOtpPhone;

    const postOtpApiResponse: SagaReturnType<typeof postOtpMutation.call> = yield call(
      postOtpMutation.call,
      {
        params: { [selectedResource]: values.resource } as Record<'email' | 'phone', string>
      }
    );

    if (postOtpApiResponse.data.retryDelay) {
      yield put(
        authActions.setOtp({
          type: selectedResource,
          resource: values.resource,
          retryDelay: postOtpApiResponse.data.retryDelay
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
