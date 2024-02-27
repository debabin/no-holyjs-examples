import { takeLatest } from 'redux-saga/effects';

import { onLogout } from './onLogout';

export function* indexSagas() {
  yield takeLatest(onLogout.action, onLogout.saga);
}

export * from './onLogout';
