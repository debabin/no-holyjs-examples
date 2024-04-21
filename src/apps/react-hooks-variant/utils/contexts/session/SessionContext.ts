import React from 'react';

export interface SessionContextProps {
  session: boolean;
  setSession: (session: boolean) => void;
}

export const SessionContext = React.createContext<SessionContextProps>({
  session: false,
  setSession: () => {}
});
