import { action } from '@reatom/framework';
import { session, token } from '@reatom-variant/model';
import { router } from '@reatom-variant/router';

export const logout = action((ctx) => {
  token(ctx, null);
  session(ctx, { isAuthenticated: false });

  router.navigate({
    to: '/auth',
    replace: true
  });
}, 'logout');
