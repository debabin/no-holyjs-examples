import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

import { AuthLoading } from '../pages/auth/loading';
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
  beforeLoad: async () => {
    if (store.getState().session.isAuthenticated) {
      throw redirect({
        to: '/'
      });
    }

    const { authPrefix, authReducer } = await import('../pages/auth/slices');
    store.rootReducer.inject(
      {
        reducerPath: authPrefix,
        reducer: authReducer
      },
      { overrideExisting: true }
    );

    const { sagas } = await import('../pages/auth/sagas');
    store.sagaInjector.inject(authPrefix, sagas);

    store.dispatch({ type: '@@INIT' });
  }
});
