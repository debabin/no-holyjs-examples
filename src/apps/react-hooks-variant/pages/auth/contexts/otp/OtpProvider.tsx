import React, { useMemo } from 'react';

import type { Otp } from './OtpContext';

import { OtpContext } from './OtpContext';

export interface OtpProviderProps {
  children: React.ReactNode;
}

export const OtpProvider = ({ children }: OtpProviderProps) => {
  const [otp, setOtp] = React.useState<Otp>({ type: 'email', resource: '', retryDelay: 0 });

  const value = useMemo(() => ({ otp, setOtp }), [otp]);

  return <OtpContext.Provider value={value}>{children}</OtpContext.Provider>;
};
