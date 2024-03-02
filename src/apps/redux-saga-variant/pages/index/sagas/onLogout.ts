import { sessionSlice } from '@redux-saga-variant/redux/slices/session/slice';
import { router } from '@redux-saga-variant/router';
import { createAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

import { COOKIE } from '@/utils/constants';

export const action = createAction('index.onLogout');

export function* saga() {
  try {
    yield put(sessionSlice.actions.setSession(false));
    yield localStorage.removeItem(COOKIE.ACCESS_TOKEN);

    yield router.navigate({
      to: '/auth',
      replace: true
    });
  } catch (error) {
    console.error(error);
  }
}

export const onLogout = {
  saga,
  action
};
