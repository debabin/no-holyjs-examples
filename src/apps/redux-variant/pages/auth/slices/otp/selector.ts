import type { RootState } from '@redux/store';

import type { authReducer } from '..';

export const getOtp = (state: RootState<{ auth: ReturnType<typeof authReducer> }>) =>
  state.auth.otp;
