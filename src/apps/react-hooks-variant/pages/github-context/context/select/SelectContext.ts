import React from 'react';

export interface Select {
  id: GithubCard['id'] | null;
  offset: {
    x: number;
    y: number;
  };
}

export interface SelectContextProps {
  select: Select;
  setSelect: (select: Select) => void;
}

export const SelectContext = React.createContext<SelectContextProps>({
  select: {
    id: null,
    offset: {
      x: 0,
      y: 0
    }
  },
  setSelect: () => {}
});
