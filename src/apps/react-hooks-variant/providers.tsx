import type { ProfileProviderProps } from './utils/contexts/profile';
import type { QueryProviderProps } from './utils/contexts/query';
import type { SessionProviderProps } from './utils/contexts/session';
import type { ThemeProviderProps } from './utils/contexts/theme';

import { ProfileProvider } from './utils/contexts/profile';
import { QueryProvider } from './utils/contexts/query';
import { SessionProvider } from './utils/contexts/session';
import { ThemeProvider } from './utils/contexts/theme';

export interface ProvidersProps {
  children: React.ReactNode;
  profile: Omit<ProfileProviderProps, 'children'>;
  query: Omit<QueryProviderProps, 'children'>;
  session: Omit<SessionProviderProps, 'children'>;
  theme: Omit<ThemeProviderProps, 'children'>;
}

const Providers = ({ theme, session, profile, query, children }: ProvidersProps) => (
  <ThemeProvider {...theme}>
    <SessionProvider {...session}>
      <ProfileProvider {...profile}>
        <QueryProvider {...query}>{children}</QueryProvider>
      </ProfileProvider>
    </SessionProvider>
  </ThemeProvider>
);

export default Providers;
