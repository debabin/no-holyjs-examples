import { useMutation } from '@tanstack/react-query';

import type { PostTwoFactorAuthenticationRequestConfig } from '../requests/twoFactorAuthentication';
import { postTwoFactorAuthentication } from '../requests/twoFactorAuthentication';

export const usePostTwoFactorAuthenticationMutation = (
  settings?: MutationSettings<
    PostTwoFactorAuthenticationRequestConfig,
    typeof postTwoFactorAuthentication
  >
) =>
  useMutation({
    mutationKey: ['twoFactorAuthentication'],
    mutationFn: ({ params, config }) =>
      postTwoFactorAuthentication({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
