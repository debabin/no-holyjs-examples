'use client';

import { useProfile } from '@/utils/contexts';

export const Profile = () => {
  const { profile } = useProfile();

  return (
    <div>
      {profile?.firstName} {profile?.lastName}
    </div>
  );
};
