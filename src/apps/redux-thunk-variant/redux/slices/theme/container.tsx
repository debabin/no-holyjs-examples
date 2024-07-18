import React from 'react';
import { useSelector } from 'react-redux';

import { themeSlice } from './slice';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContainer = ({ children }: ThemeProviderProps) => {
  const theme = useSelector(themeSlice.selectors.getTheme);

  React.useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
