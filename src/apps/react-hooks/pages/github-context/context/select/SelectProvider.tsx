import React from 'react';

import type { Select } from './SelectContext';
import { SelectContext } from './SelectContext';

export interface SelectProviderProps {
  children: React.ReactNode;
}

export const SelectProvider: React.FC<SelectProviderProps> = ({ children }) => {
  const [select, setSelect] = React.useState<Select>({
    id: null,
    offset: {
      x: 0,
      y: 0
    }
  });

  const value = React.useMemo(() => ({ select, setSelect }), [select]);

  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};
