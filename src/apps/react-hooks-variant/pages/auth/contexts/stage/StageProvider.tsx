import React, { useMemo } from 'react';

import type { Stage } from './StateContext';

import { StageContext } from './StateContext';

export interface StageProviderProps {
  children: React.ReactNode;
  defaultStage?: Stage;
}

export const StageProvider = ({ children, defaultStage = 'signIn' }: StageProviderProps) => {
  const [stage, setStage] = React.useState<Stage>(defaultStage);

  const value = useMemo(() => ({ stage, setStage }), [stage]);

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
};
