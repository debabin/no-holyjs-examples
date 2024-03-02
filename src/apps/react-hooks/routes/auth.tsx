import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

const authSearchSchema = zod.object({
  stage: zod.string().optional().catch('signIn')
});

export const Route = createFileRoute(ROUTES.AUTH)({
  validateSearch: authSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/'
      });
    }
  }
});
