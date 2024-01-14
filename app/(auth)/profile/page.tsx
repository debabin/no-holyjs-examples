import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIE } from '@/utils/constants';

import { Profile } from './Profile/Profile';

const ProfilePage = () => {
  const sessionIdCookie = cookies().get(COOKIE.SESSION_ID);
  const accessTokenCookie = cookies().get(COOKIE.ACCESS_TOKEN);

  if (!sessionIdCookie && !accessTokenCookie) redirect('/auth');

  return <Profile />;
};

export default ProfilePage;
