import { createCountdownSlice } from '@/apps/redux-saga-variant/redux/create-countdown';

export const otpCountdownSlice = createCountdownSlice({
  name: 'otpCountdown' as const
});
