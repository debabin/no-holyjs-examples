import { useMutation } from '@tanstack/react-query';

import type { PostSignInLoginConfig } from '../requests/signin/login';
import { postSignInLogin } from '../requests/signin/login';

export const usePostSignInLoginMutation = (
  settings?: MutationSettings<PostSignInLoginConfig, typeof postSignInLogin>
) =>
  useMutation({
    mutationKey: ['postSignInLogin'],
    mutationFn: (params) =>
      postSignInLogin({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options
  });
