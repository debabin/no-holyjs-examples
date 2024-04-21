import { action, atom, reatomAsync, withAssign, withDataAtom, withInit } from '@reatom/framework';
import { withLocalStorage } from '@reatom/persist-web-storage';

import { COOKIE } from '@/utils';
import { getProfile } from '@/utils/api';

type Theme = 'light' | 'dark';

export const theme = atom<Theme>('light', 'theme').pipe(
  withInit((ctx, init) => {
    const current = init(ctx);
    theme.set(ctx, current);
    return current;
  }),
  withLocalStorage(COOKIE.THEME),
  withAssign((_, name) => ({
    set: action((_, theme: Theme) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }, `${name}.set`)
  })),
  withAssign((original, name) => ({
    toggle: action((ctx) => {
      if (ctx.get(original) === 'light') {
        original(ctx, 'dark');
      } else {
        original(ctx, 'light');
      }
    }, `${name}.toggle`)
  }))
);

theme.onChange(theme.set);

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
