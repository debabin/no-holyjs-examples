import React from 'react';

import type { Theme } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

export interface ThemeProviderProps {
  defaultTheme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark'
}) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
