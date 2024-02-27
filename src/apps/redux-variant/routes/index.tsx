import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { IndexLoading } from '../pages/index/loading';
import { store } from '../redux/store';

const IndexPageLazy = lazy(() => import('../pages/index/page'));

export const Route = createFileRoute(ROUTES.INDEX)({
  component: () => (
    <Suspense fallback={<IndexLoading />}>
      <IndexPageLazy />
    </Suspense>
  ),
  beforeLoad: () => {
    if (!store.getState().session.isAuthenticated) {
      throw redirect({
        to: '/auth'
      });
    }
  }
});
