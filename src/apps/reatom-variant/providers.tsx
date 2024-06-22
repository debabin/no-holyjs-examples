import React from 'react';
import { reatomContext as ReatomContext } from '@reatom/npm-react';

import { ctx } from './reatom';

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <ReatomContext.Provider value={ctx}>{children}</ReatomContext.Provider>
);

export default Providers;
