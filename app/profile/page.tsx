import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getProfile } from '@/utils/api';
import { COOKIE } from '@/utils/constants';

const ProfilePage = async () => {
  const sessionIdCookie = cookies().get(COOKIE.SESSION_ID);
  if (!sessionIdCookie) redirect('/auth');

  const profile = await getProfile().catch(() => {
    redirect('/auth');
  });

  return (
    <div>
      {profile.data.firstName} {profile.data.lastName}
    </div>
  );
};

export default ProfilePage;
