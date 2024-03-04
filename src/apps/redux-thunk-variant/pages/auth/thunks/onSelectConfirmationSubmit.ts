import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';

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

export const thunk = createAsyncThunk<void, OnSelectConfirmationSubmitPayload>(
  action.type,
  async (payload, { dispatch }) => {
    try {
      const { values, selectedResource } = payload;

      const postOtp =
        selectedResource === 'email'
          ? apiSlice.endpoints.postOtpEmail
          : apiSlice.endpoints.postOtpPhone;

      const postOtpApiResponse = await dispatch(
        postOtp.initiate({
          params: { phone: values.resource }
        })
      ).unwrap();

      if (postOtpApiResponse.data.retryDelay) {
        dispatch(
          authActions.setOtp({
            type: selectedResource,
            resource: values.resource,
            retryDelay: postOtpApiResponse.data.retryDelay
          })
        );

        dispatch(authActions.setStage('confirmation'));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const onSelectConfirmationSubmit = {
  thunk,
  action
};
