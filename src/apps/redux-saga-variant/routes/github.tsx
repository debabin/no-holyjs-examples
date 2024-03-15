import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { store } from '../redux/store';

export const Route = createFileRoute(ROUTES.GITHUB)({
  beforeLoad: async () => {
    const { githubPrefix, githubReducer } = await import('../pages/github/slices');
    store.rootReducer.inject(
      {
        reducerPath: githubPrefix,
        reducer: githubReducer
      },
      { overrideExisting: true }
    );

    const { sagas, githubSagas } = await import('../pages/github/sagas');
    store.sagaInjector.inject(githubPrefix, sagas);

    store.dispatch(githubSagas.initCards.action());

    store.dispatch({ type: '@@INIT' });
  }
});
