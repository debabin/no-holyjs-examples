import { takeLatest } from 'redux-saga/effects';

import { onConfirmationSubmit } from './onConfirmationSubmit';
import { onOtpResend } from './onOtpResend';
import { onSelectConfirmationSubmit } from './onSelectConfirmationSubmit';
import { onSignInSubmit } from './onSingInSubmit';
import { onSignUpSubmit } from './onSingUpSubmit';

export function* sagas() {
  yield takeLatest(onSignInSubmit.action.type, onSignInSubmit.saga);
  yield takeLatest(onOtpResend.action.type, onOtpResend.saga);
  yield takeLatest(onConfirmationSubmit.action.type, onConfirmationSubmit.saga);
  yield takeLatest(onSelectConfirmationSubmit.action.type, onSelectConfirmationSubmit.saga);
  yield takeLatest(onSignUpSubmit.action.type, onSignUpSubmit.saga);
}

export const authSagas = {
  onOtpResend,
  onSignInSubmit,
  onConfirmationSubmit,
  onSelectConfirmationSubmit,
  onSignUpSubmit
};
