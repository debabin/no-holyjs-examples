import { createLazyFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { IndexLoading } from '../pages/index/loading';
import { IndexPage } from '../pages/index/page';

export const Route = createLazyFileRoute(ROUTES.INDEX)({
  component: IndexPage,
  pendingComponent: IndexLoading
});
