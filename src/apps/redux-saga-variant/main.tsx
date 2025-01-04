import { store } from '@redux-saga-variant/redux/store';
import ReactDOM from 'react-dom/client';

import { COOKIE } from '@/utils/constants';

import { App } from './app';
import Providers from './providers';
import { apiSlice } from './redux/api';
import { profileSlice } from './redux/slices/profile/slice';
import { sessionSlice } from './redux/slices/session/slice';
import { themeSlice } from './redux/slices/theme/slice';

const defaultTheme = 'light';

export const init = async () => {
  const rootElement = document.getElementById('root')!;
  const root = ReactDOM.createRoot(rootElement);

  const token = localStorage.getItem(COOKIE.ACCESS_TOKEN);

  if (token) {
    const getProfileApiResponse = await apiSlice.endpoints.getProfile.initiate();

    store.dispatch(sessionSlice.actions.setSession(true));
    store.dispatch(themeSlice.actions.setTheme(defaultTheme));

    if (getProfileApiResponse.data) {
      store.dispatch(profileSlice.actions.setProfile(getProfileApiResponse.data.profile));
    }
  }

  root.render(
    <Providers>
      <App />
    </Providers>
  );
};
