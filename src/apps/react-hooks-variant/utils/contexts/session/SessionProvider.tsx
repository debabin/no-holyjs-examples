import React, { useMemo } from 'react';

import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  children: React.ReactNode;
  defaultSession?: boolean;
}

export const SessionProvider = ({ children, defaultSession = false }: SessionProviderProps) => {
  const [session, setSession] = React.useState(defaultSession);

  const value = useMemo(() => ({ session, setSession }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
