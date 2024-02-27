import { Provider as ReactReduxProvider } from 'react-redux';

import type { ProfileProviderProps } from '@/utils/contexts/profile';
import { ProfileProvider } from '@/utils/contexts/profile';
import type { QueryProviderProps } from '@/utils/contexts/query';
import { QueryProvider } from '@/utils/contexts/query';
import type { ThemeProviderProps } from '@/utils/contexts/theme';
import { ThemeProvider } from '@/utils/contexts/theme';

import { store } from './redux/store';

export interface ProvidersProps {
  children: React.ReactNode;
  theme: Omit<ThemeProviderProps, 'children'>;
  profile: Omit<ProfileProviderProps, 'children'>;
  query: Omit<QueryProviderProps, 'children'>;
}

const Providers = ({ theme, profile, query, children }: ProvidersProps) => (
  <ReactReduxProvider store={store}>
    <ThemeProvider {...theme}>
      <ProfileProvider {...profile}>
        <QueryProvider {...query}>{children}</QueryProvider>
      </ProfileProvider>
    </ThemeProvider>
  </ReactReduxProvider>
);

export default Providers;
