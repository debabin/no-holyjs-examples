import { reatomComponent } from '@reatom/npm-react';
import { RouterProvider } from '@tanstack/react-router';

import { session } from './model';
import { router } from './router';

import '@/assets/styles/globals.css';

export const App = reatomComponent(({ ctx }) => {
  const sessionValue = ctx.spy(session);

  return (
    <RouterProvider router={router} context={{ isAuthenticated: sessionValue.isAuthenticated }} />
  );
}, 'App');
