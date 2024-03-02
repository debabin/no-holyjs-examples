import { takeLatest } from 'redux-saga/effects';

import { onLogout } from './onLogout';

export function* sagas() {
  yield takeLatest(onLogout.action, onLogout.saga);
}

export const indexSagas = {
  onLogout
};
