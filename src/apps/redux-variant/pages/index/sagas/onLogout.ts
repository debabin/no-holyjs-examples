import { router } from '@redux-variant/router';
import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

import { sessionSlice } from '@/apps/redux-variant/redux/slices';
import { COOKIE } from '@/utils';

export const action = createAction('index.onLogout');

export function* saga() {
  yield put(sessionSlice.actions.setSession(false));
  localStorage.removeItem(COOKIE.ACCESS_TOKEN);

  yield call(router.navigate, {
    to: '/auth',
    replace: true
  });
}

export const onLogout = {
  saga,
  action
};
