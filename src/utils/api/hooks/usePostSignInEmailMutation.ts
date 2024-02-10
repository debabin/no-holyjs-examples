import { useMutation } from '@tanstack/react-query';

import type { PostSignInEmailConfig } from '../requests/signin/email';
import { postSignInEmail } from '../requests/signin/email';

export const usePostSignInEmailMutation = (
  settings?: MutationSettings<PostSignInEmailConfig, typeof postSignInEmail>
) =>
  useMutation({
    mutationKey: ['postSignInEmail'],
    mutationFn: (params) =>
      postSignInEmail({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options
  });
