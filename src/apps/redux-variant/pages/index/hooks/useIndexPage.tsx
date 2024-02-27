import { cacheApi } from '@redux-variant/redux/api';
import { useDispatch } from '@redux-variant/redux/hooks';

import { onLogout } from '../sagas';

export const useIndexPage = () => {
  const dispatch = useDispatch();

  const getProfileQuery = cacheApi.useGetProfileQuery();

  const onLogoutClick = () => dispatch(onLogout.action());

  return { state: { profile: getProfileQuery.data!.profile }, functions: { onLogoutClick } };
};
