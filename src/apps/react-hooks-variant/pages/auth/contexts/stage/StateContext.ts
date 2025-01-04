import React from 'react';

export type Stage = 'confirmation' | 'selectConfirmation' | 'signIn' | 'signUp';

export interface StageContextProps {
  stage: Stage;
  setStage: (stage: Stage) => void;
}

export const StageContext = React.createContext<StageContextProps>({
  stage: 'signIn',
  setStage: () => {}
});
