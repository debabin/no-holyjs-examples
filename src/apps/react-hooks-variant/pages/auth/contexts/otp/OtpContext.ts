import React from 'react';

export interface Otp {
  resource: string;
  retryDelay: number;
  type: 'email' | 'phone';
}

export interface OtpContextProps {
  otp: Otp;
  setOtp: (value: Otp) => void;
}

export const OtpContext = React.createContext<OtpContextProps>({
  otp: { type: 'email', resource: '', retryDelay: 0 },
  setOtp: () => {}
});
