import React from 'react';

export type Stage = 'signIn' | 'signUp' | 'emailConfirmation';

export interface StageContextProps {
  stage: Stage;
  setStage: (stage: Stage) => void;
}

export const StageContext = React.createContext<StageContextProps>({
  stage: 'signIn',
  setStage: () => {}
});
