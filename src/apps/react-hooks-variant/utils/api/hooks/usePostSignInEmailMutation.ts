import { useMutation } from '@tanstack/react-query';

import type { PostSignInEmailRequestConfig } from '@/utils/api/requests/signin/email';
import { postSignInEmail } from '@/utils/api/requests/signin/email';

export const usePostSignInEmailMutation = (
  settings?: MutationSettings<PostSignInEmailRequestConfig, typeof postSignInEmail>
) =>
  useMutation({
    mutationKey: ['postSignInEmail'],
    mutationFn: ({ params, config }) =>
      postSignInEmail({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
