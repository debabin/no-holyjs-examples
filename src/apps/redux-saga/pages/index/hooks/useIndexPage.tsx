import { flushSync } from 'react-dom';
import { cacheApi } from '@redux/api';
import { useNavigate } from '@tanstack/react-router';

import { COOKIE } from '@/utils';
import { useSession } from '@/utils/contexts/session';

export const useIndexPage = () => {
  const navigate = useNavigate();
  const getProfileQuery = cacheApi.useGetProfileQuery();

  const { setSession } = useSession();

  const onLogout = () => {
    flushSync(() => {
      setSession(false);
      localStorage.removeItem(COOKIE.ACCESS_TOKEN);
    });
    navigate({
      to: '/auth',
      replace: true
    });
  };

  return { state: { profile: getProfileQuery.data!.profile }, functions: { onLogout } };
};
