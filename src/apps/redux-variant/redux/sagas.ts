import { all } from 'redux-saga/effects';

import { authSagas } from '../pages/auth/sagas';
import { indexSagas } from '../pages/index/sagas';

export function* rootSaga() {
  yield all([authSagas(), indexSagas()]);
}
