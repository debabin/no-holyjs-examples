import React, { useMemo } from 'react';

import { ProfileContext } from './ProfileContext';

export interface ProfileProviderProps {
  defaultProfile: Profile | null;
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children, defaultProfile }) => {
  const [profile, setProfile] = React.useState<Profile | null>(defaultProfile);

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
