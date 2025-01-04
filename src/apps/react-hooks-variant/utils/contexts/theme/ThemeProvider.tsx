import React from 'react';

import type { Theme } from './ThemeContext';

import { ThemeContext } from './ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider = ({ children, defaultTheme = 'dark' }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
