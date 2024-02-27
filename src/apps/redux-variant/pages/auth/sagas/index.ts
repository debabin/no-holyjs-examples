import { takeLatest } from 'redux-saga/effects';

import { onSignInSubmit } from './onSignInSubmit';

export function* authSagas() {
  yield takeLatest(onSignInSubmit.action, onSignInSubmit.saga);
}
