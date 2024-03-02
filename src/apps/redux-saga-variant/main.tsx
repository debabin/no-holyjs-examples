import ReactDOM from 'react-dom/client';
import { store } from '@redux-saga-variant/redux/store';

import { COOKIE } from '@/utils/constants';

import { apiSlice } from './redux/api';
import { profileSlice } from './redux/slices/profile/slice';
import { sessionSlice } from './redux/slices/session/slice';
import { themeSlice } from './redux/slices/theme/slice';
import { App } from './app';
import Providers from './providers';

const defaultTheme = 'light';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

const init = async () => {
  const token = localStorage.getItem(COOKIE.ACCESS_TOKEN);

  if (token) {
    // @ts-ignore
    const getProfileApiResponse = await apiSlice.endpoints.getProfile.call();

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

init();
