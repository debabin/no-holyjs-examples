import { useSelector } from 'react-redux';
import { RouterProvider } from '@tanstack/react-router';

import { sessionSlice } from './redux/slices/session/slice';
import { router } from './router';

import '@/assets/styles/globals.css';

export const App = () => {
  const session = useSelector(sessionSlice.selectors.getIsAuthenticated);

  return <RouterProvider router={router} context={{ isAuthenticated: session }} />;
};
