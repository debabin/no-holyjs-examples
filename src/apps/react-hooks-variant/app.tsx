import { createRouter, RouterProvider } from '@tanstack/react-router';

import { useSession } from '@/utils/contexts/session';

import { routeTree } from '../../routeTree.gen';

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

  return <RouterProvider router={router} context={{ isAuthenticated: session }} />;
};
