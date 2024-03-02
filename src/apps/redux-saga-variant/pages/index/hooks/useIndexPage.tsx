import { useSelector } from 'react-redux';
import { useDispatch } from '@redux-saga-variant/redux/hooks';
import { profileSlice } from '@redux-saga-variant/redux/slices/profile/slice';

import { indexSagas } from '../sagas';

export const useIndexPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSlice.selectors.getProfile);

  const onLogoutClick = () => dispatch(indexSagas.onLogout.action());

  return { state: { profile }, functions: { onLogoutClick } };
};
