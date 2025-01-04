import { useDispatch } from '@redux-thunk-variant/redux/hooks';
import { profileSlice } from '@redux-thunk-variant/redux/slices/profile/slice';
import { useSelector } from 'react-redux';

import { indexThunks } from '../thunks';

export const useIndexPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSlice.selectors.getProfile);

  const onLogoutClick = () => dispatch(indexThunks.onLogout.thunk());

  return { state: { profile }, functions: { onLogoutClick } };
};
