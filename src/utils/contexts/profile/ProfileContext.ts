import React from 'react';

export interface ProfileContextProps {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const ProfileContext = React.createContext<ProfileContextProps>({
  profile: null,
  setProfile: () => {}
});
