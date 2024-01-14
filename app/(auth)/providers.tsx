'use client';

import type { ProfileProviderProps } from '@/utils/contexts';
import { ProfileProvider } from '@/utils/contexts';

interface ProvidersProps {
  children: React.ReactNode;
  profile: Omit<ProfileProviderProps, 'children'>;
}

const Providers: React.FC<ProvidersProps> = ({ children, profile }) => (
  <ProfileProvider {...profile}>{children}</ProfileProvider>
);

export default Providers;
