import { onConfirmationSubmit } from './onConfirmationSubmit';
import { onOtpResend } from './onOtpResend';
import { onSelectConfirmationSubmit } from './onSelectConfirmationSubmit';
import { onSignInSubmit } from './onSingInSubmit';
import { onSignUpSubmit } from './onSingUpSubmit';

export const authThunks = {
  onOtpResend,
  onSignInSubmit,
  onConfirmationSubmit,
  onSelectConfirmationSubmit,
  onSignUpSubmit
};
