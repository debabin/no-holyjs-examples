import { createLazyFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { FigmaLoading } from '../pages/figma/loading';
import { FigmaPage } from '../pages/figma/page';

export const Route = createLazyFileRoute(ROUTES.FIGMA)({
  component: FigmaPage,
  pendingComponent: FigmaLoading
});
