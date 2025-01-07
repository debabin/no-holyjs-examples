import { sessionSlice } from '@redux-thunk-variant/redux/slices/session/slice';
import { router } from '@redux-thunk-variant/router';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { COOKIE } from '@/utils/constants';

export const action = createAction('index.onLogout');

export const thunk = createAsyncThunk(action.type, (_, { dispatch }) => {
  dispatch(sessionSlice.actions.setSession(false));
  localStorage.removeItem(COOKIE.ACCESS_TOKEN);

  router.navigate({
    to: '/auth',
    replace: true
  });
});

export const onLogout = {
  thunk,
  action
};
