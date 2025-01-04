import { sessionAtom, tokenAtom } from '@reatom-variant/model';
import { router } from '@reatom-variant/router';
import { action } from '@reatom/framework';

export const logout = action((ctx) => {
  tokenAtom(ctx, null);
  sessionAtom(ctx, { isAuthenticated: false });

  router.navigate({
    to: '/auth',
    replace: true
  });
}, 'logout');
