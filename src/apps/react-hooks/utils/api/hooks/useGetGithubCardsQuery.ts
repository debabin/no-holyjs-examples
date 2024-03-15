import { useQuery } from '@tanstack/react-query';

import { getGithubCards } from '@/utils/api/requests/github/cards';

export const useGetGithubCardsQuery = (settings?: QuerySettings<typeof getGithubCards>) =>
  useQuery({
    queryKey: ['getGithubCards'],
    queryFn: () => getGithubCards({ config: settings?.config }),
    ...settings?.options
  });
