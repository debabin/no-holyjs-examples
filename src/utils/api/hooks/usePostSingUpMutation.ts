import { useMutation } from '@tanstack/react-query';

import type { PostSingUpParams } from '../requests/signup';
import { postSingUp } from '../requests/signup';

export const usePostSingUpMutation = (
  settings?: MutationSettings<PostSingUpParams, typeof postSingUp>
) =>
  useMutation({
    mutationKey: ['postSingUp'],
    mutationFn: (params) =>
      postSingUp({ params, ...(settings?.config && { config: settings.config }) }),
    ...settings?.options
  });
