import { createCountdownSlice } from '@/apps/redux-thunk-variant/redux/create-countdown';

export const otpCountdownSlice = createCountdownSlice({
  name: 'otpCountdown' as const
});
