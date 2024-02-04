import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import * as zod from 'zod';

import { ROUTES } from '@/utils/constants/routes';

const authSearchSchema = zod.object({
  stage: zod.string().catch('signIn')
});

const AuthPageLazy = lazy(() => import('@/pages/auth/page'));

export const Route = createFileRoute(ROUTES.AUTH)({
  component: () => (
    <Suspense>
      <AuthPageLazy />
    </Suspense>
  ),
  validateSearch: authSearchSchema
});
