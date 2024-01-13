import { useMutation } from '@tanstack/react-query';

import type { PostSignInParams } from '../requests/signin';
import { postSignIn } from '../requests/signin';

export const usePostSignInMutation = (
  settings?: MutationSettings<PostSignInParams, typeof postSignIn>
) =>
  useMutation({
    mutationKey: ['postSignIn'],
    mutationFn: (params) =>
      postSignIn({ params, ...(settings?.config && { config: settings.config }) }),
    ...settings?.options
  });
