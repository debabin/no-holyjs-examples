import { createFileRoute, redirect } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { store } from '../redux/store';

export const Route = createFileRoute(ROUTES.INDEX)({
  beforeLoad: () => {
    if (!store.getState().session.isAuthenticated) {
      throw redirect({
        to: '/auth'
      });
    }
  }
});
