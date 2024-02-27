import type { RootState } from '@redux-variant/redux/store';

export const getIsAuthenticated = (state: RootState) => state.session.isAuthenticated;
