import { createLazyFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { GithubPage } from '../pages/github/page';

export const Route = createLazyFileRoute(ROUTES.GITHUB)({
  component: GithubPage
});
