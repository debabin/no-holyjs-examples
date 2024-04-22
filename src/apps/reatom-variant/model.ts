import { action, atom, reatomAsync, reatomEnum, withAssign, withDataAtom } from '@reatom/framework';
import { withLocalStorage } from '@reatom/persist-web-storage';

import { COOKIE } from '@/utils';
import { getProfile } from '@/utils/api';

export const theme = reatomEnum(['light', 'dark'], 'theme').pipe(
  withLocalStorage(COOKIE.THEME),
  withAssign((original, name) => ({
    toggle: action((ctx) => {
      original(ctx, (state) => (state === 'light' ? 'dark' : 'light'));
    }, `${name}.toggle`)
  }))
);
theme.onChange((_ctx, state) => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(state);
});

export const token = atom<null | string>(null, 'token').pipe(withLocalStorage(COOKIE.ACCESS_TOKEN));

export const session = atom(
  {
    isAuthenticated: false
  },
  'session'
);

export const fetchProfile = reatomAsync(async (ctx) => {
  const getProfileApiResponse = await getProfile();
  session(ctx, { isAuthenticated: true });

  return getProfileApiResponse.data.profile;
}, 'fetchProfile').pipe(withDataAtom({} as Profile));
