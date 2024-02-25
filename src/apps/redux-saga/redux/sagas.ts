import { all } from 'redux-saga/effects';

import { authSagas } from '../pages/auth/sagas';

export function* rootSaga() {
  yield all([authSagas()]);
}
