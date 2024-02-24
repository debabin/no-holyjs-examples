import { useMutation } from '@tanstack/react-query';

import type { PostSignInLoginRequestConfig } from '../requests';
import { postSignInLogin } from '../requests';

export const usePostSignInLoginMutation = (
  settings?: MutationSettings<PostSignInLoginRequestConfig, typeof postSignInLogin>
) =>
  useMutation({
    mutationKey: ['postSignInLogin'],
    mutationFn: ({ params, config }) =>
      postSignInLogin({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
