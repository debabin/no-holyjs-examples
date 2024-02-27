import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

// interface OnSignInSubmitParams {
//   type:
// }

export const action = createAction('auth.onSignInSubmit');

export function* saga() {
  // const {} = yield call();
  yield put({ type: 'asd', user: {} });
}

export const onSignInSubmit = {
  saga,
  action
};
