import { createLazyFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { GithubContextPage } from '../pages/github-context/page';

export const Route = createLazyFileRoute(ROUTES.GITHUB_CONTEXT)({
  component: GithubContextPage
});
