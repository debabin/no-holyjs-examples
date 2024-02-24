import { flushSync } from 'react-dom';
import { useNavigate } from '@tanstack/react-router';

import { COOKIE } from '@/utils';
import { useProfile } from '@/utils/contexts/profile';
import { useSession } from '@/utils/contexts/session';

export const useIndexPage = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
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

  return { state: { profile }, functions: { onLogout } };
};
