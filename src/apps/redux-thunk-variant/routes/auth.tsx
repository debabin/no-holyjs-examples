import { createFileRoute, redirect } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

import { store } from '../redux/store';

const authSearchSchema = zod.object({
  stage: zod.string().optional().catch('signIn')
});

export const Route = createFileRoute(ROUTES.AUTH)({
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

    store.dispatch({ type: '@@INIT' });
  }
});
