import { reatomComponent } from '@reatom/npm-react';
import { RouterProvider } from '@tanstack/react-router';

import { sessionAtom } from './model';
import { router } from './router';

import '@/assets/styles/globals.css';

export const App = reatomComponent(({ ctx }) => {
  const sessionValue = ctx.spy(sessionAtom);

  return (
    <RouterProvider context={{ isAuthenticated: sessionValue.isAuthenticated }} router={router} />
  );
}, 'App');
