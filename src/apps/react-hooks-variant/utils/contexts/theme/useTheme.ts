import React from 'react';

import { ThemeContext } from './ThemeContext';

export const useTheme = () => React.useContext(ThemeContext);
