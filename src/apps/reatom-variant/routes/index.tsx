import { createFileRoute, redirect } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { sessionAtom } from '../model';
import { ctx } from '../reatom';

export const Route = createFileRoute(ROUTES.INDEX)({
  beforeLoad: () => {
    if (!ctx.get(sessionAtom).isAuthenticated) {
      throw redirect({
        to: '/auth'
      });
    }
  }
});
