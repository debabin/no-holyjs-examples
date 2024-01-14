import { redirect } from 'next/navigation';

import { getProfile } from '@/utils/api/requests';
import { requestWithCookies } from '@/utils/helpers/requestWithCookies';

import Providers from './providers';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = async ({ children }) => {
  const getProfileResponse = await getProfile().catch((error) => {
    // console.log('@', error);
    // redirect('/auth');
  });

  return <div>123</div>;
  // return <Providers profile={{ defaultProfile: getProfileResponse.data }}>{children}</Providers>;
};
export default AuthLayout;
