import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { AuthLoading } from '@/pages/auth/loading';
import { ROUTES } from '@/utils/constants/routes';

const authSearchSchema = zod.object({
  stage: zod.string().catch('signIn')
});

const AuthPageLazy = lazy(() => import('@/pages/auth/page'));

export const Route = createFileRoute(ROUTES.AUTH)({
  component: () => (
    <Suspense fallback={<AuthLoading />}>
      <AuthPageLazy />
    </Suspense>
  ),
  validateSearch: authSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/'
      });
    }
  }
});
