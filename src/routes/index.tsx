import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { IndexLoading } from '@/pages/index/loading';
import { ROUTES } from '@/utils/constants/routes';

const IndexPageLazy = lazy(() => import('@/pages/index/page'));

export const Route = createFileRoute(ROUTES.INDEX)({
  component: () => (
    <Suspense fallback={<IndexLoading />}>
      <IndexPageLazy />
    </Suspense>
  ),
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/auth'
      });
    }
  }
});
