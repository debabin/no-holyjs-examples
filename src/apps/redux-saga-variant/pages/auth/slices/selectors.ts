import type { RootState } from '@redux-saga-variant/redux/store';

export const getOtp = (state: RootState) => state.auth!.otp;
export const getStage = (state: RootState) => state.auth!.stage.value;
export const getOtpCountdown = (state: RootState) => state.auth!.otpCountdown;

export const getSignInFormLoading = (state: RootState) =>
  state.api.postSignInLogin.status === 'pending' || state.api.postOtpEmail.status === 'pending';

export const getConfirmationFormLoading = (state: RootState) =>
  state.api.postTwoFactorAuthentication.status === 'pending';

export const getSelectConfirmationFormLoading = (state: RootState) =>
  state.api.postOtpEmail.status === 'pending' || state.api.postOtpPhone.status === 'pending';

export const getSignUpFormLoading = (state: RootState) => state.api.postSignUp.status === 'pending';
