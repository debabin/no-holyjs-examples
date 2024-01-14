import { useMutation } from '@tanstack/react-query';

import { deleteLogout } from '../requests/logout';

export const useDeleteLogoutMutation = (settings?: MutationSettings<void, typeof deleteLogout>) =>
  useMutation({
    mutationKey: ['deleteLogout'],
    mutationFn: () => deleteLogout({ ...(settings?.config && { config: settings.config }) }),
    ...settings?.options
  });
