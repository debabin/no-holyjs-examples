import React, { useMemo } from 'react';

import { ProfileContext } from './ProfileContext';

export interface ProfileProviderProps {
  children: React.ReactNode;
  defaultProfile?: Profile;
}

export const ProfileProvider = ({ children, defaultProfile }: ProfileProviderProps) => {
  const [profile, setProfile] = React.useState<Profile>(defaultProfile!);

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
