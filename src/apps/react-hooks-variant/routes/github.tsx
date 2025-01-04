import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

import { fetchCards } from '../pages/github/store';

export const Route = createFileRoute(ROUTES.GITHUB)({
  beforeLoad: () => {
    fetchCards();
  }
});
