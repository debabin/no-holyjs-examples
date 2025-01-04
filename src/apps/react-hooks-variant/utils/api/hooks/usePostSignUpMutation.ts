import { useMutation } from '@tanstack/react-query';

import type { PostSignUpRequestConfig } from '@/utils/api/requests/signup';

import { postSignUp } from '@/utils/api/requests/signup';

export const usePostSingUpMutation = (
  settings?: MutationSettings<PostSignUpRequestConfig, typeof postSignUp>
) =>
  useMutation({
    mutationKey: ['postSignUp'],
    mutationFn: ({ params, config }) =>
      postSignUp({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
