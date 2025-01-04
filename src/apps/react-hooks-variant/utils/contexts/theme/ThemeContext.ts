import React from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {}
});
