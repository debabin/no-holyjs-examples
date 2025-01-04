import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '../../routeTree.gen';
import { useSession } from './utils/contexts/session';

import '@/assets/styles/globals.css';

const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const { session } = useSession();

  return <RouterProvider context={{ isAuthenticated: session }} router={router} />;
};
