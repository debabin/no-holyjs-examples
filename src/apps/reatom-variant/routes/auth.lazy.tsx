import { createLazyFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { AuthLoading } from '../pages/auth/loading';
import { AuthPage } from '../pages/auth/page';

export const Route = createLazyFileRoute(ROUTES.AUTH)({
  component: AuthPage,
  pendingComponent: AuthLoading
});
