import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../requests/profile';

export const useGetProfileQuery = (settings?: QuerySettings<typeof getProfile>) =>
  useQuery({
    queryKey: ['getProfile'],
    queryFn: () => getProfile({ ...(settings?.config && { config: settings.config }) }),
    ...settings?.options
  });
