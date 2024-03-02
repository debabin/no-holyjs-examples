import { RouterProvider } from '@tanstack/react-router';

import { useSession } from '@/utils/contexts/session';

import { router } from './router';

import '@/assets/styles/globals.css';

export const App = () => {
  const { session } = useSession();

  return <RouterProvider router={router} context={{ isAuthenticated: session }} />;
};
