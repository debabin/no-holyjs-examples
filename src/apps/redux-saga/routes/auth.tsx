import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

import { AuthLoading } from '../pages/auth/loading';
import { authPrefix, authReducer } from '../pages/auth/slices';
import { store } from '../redux/store';

const authSearchSchema = zod.object({
  stage: zod.string().optional().catch('signIn')
});

const AuthPageLazy = lazy(() => import('../pages/auth/page'));

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

    store.addReducer(authPrefix, authReducer);
  }
});
