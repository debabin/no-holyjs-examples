import { useMutation } from '@tanstack/react-query';

import type { PostSignInLoginRequestConfig } from '@/utils/api/requests';

import { postSignInLogin } from '@/utils/api/requests';

export const usePostSignInLoginMutation = (
  settings?: MutationSettings<PostSignInLoginRequestConfig, typeof postSignInLogin>
) =>
  useMutation({
    mutationKey: ['postSignInLogin'],
    mutationFn: ({ params, config }) =>
      postSignInLogin({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
