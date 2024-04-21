import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

import { session } from '../model';
import { ctx } from '../reatom';

const authSearchSchema = zod.object({
  stage: zod.string().optional().catch('signIn')
});

export const Route = createFileRoute(ROUTES.AUTH)({
  validateSearch: authSearchSchema,
  beforeLoad: () => {
    if (ctx.get(session).isAuthenticated) {
      throw redirect({
        to: '/'
      });
    }
  }
});
