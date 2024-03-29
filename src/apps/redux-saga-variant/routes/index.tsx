import { createFileRoute, redirect } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { store } from '../redux/store';

export const Route = createFileRoute(ROUTES.INDEX)({
  beforeLoad: async () => {
    if (!store.getState().session.isAuthenticated) {
      throw redirect({
        to: '/auth'
      });
    }

    const { sagas } = await import('../pages/index/sagas');
    store.sagaInjector.inject('index', sagas);
  }
});
