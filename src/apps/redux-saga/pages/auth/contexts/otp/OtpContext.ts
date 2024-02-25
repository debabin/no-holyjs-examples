import React from 'react';

export interface Otp {
  type: 'email' | 'phone';
  resource: string;
  retryDelay: number;
}

export interface OtpContextProps {
  otp: Otp;
  setOtp: (value: Otp) => void;
}

export const OtpContext = React.createContext<OtpContextProps>({
  otp: { type: 'email', resource: '', retryDelay: 0 },
  setOtp: () => {}
});
