import { fetchCards } from '@reatom-variant/pages/github/model';
import { ctx } from '@reatom-variant/reatom';
import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils/constants/routes';

export const Route = createFileRoute(ROUTES.GITHUB)({
  beforeLoad: () => {
    fetchCards(ctx);
  }
});
