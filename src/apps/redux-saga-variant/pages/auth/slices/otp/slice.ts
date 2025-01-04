import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface OtpState {
  resource: string;
  retryDelay: number;
  type: 'email' | 'phone';
}

const initialState: OtpState = {
  type: 'email',
  resource: '',
  retryDelay: 0
};

export const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtp(state, action: PayloadAction<Partial<OtpState>>) {
      Object.assign(state, action.payload);
    }
  }
});
