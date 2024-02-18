import { useMutation } from '@tanstack/react-query';

import { getRefresh } from '../requests/refresh';

export const useGetRefreshMutation = (settings?: MutationSettings<void, typeof getRefresh>) =>
  useMutation({
    mutationKey: ['getRefresh'],
    mutationFn: () => getRefresh({ ...(settings?.config && { config: settings.config }) }),
    ...settings?.options
  });
