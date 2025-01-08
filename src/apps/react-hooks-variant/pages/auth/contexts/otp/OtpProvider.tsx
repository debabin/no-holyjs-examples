import React, { useMemo } from 'react';

import type { Otp } from './OtpContext';

import { OtpContext } from './OtpContext';

export interface OtpProviderProps {
  children: React.ReactNode;
  defaultOtp?: Otp;
}

export const OtpProvider = ({
  children,
  defaultOtp = { type: 'email', resource: '', retryDelay: 0 }
}: OtpProviderProps) => {
  const [otp, setOtp] = React.useState<Otp>(defaultOtp);

  const value = useMemo(() => ({ otp, setOtp }), [otp]);

  return <OtpContext.Provider value={value}>{children}</OtpContext.Provider>;
};
