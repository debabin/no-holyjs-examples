import { useMutation } from '@tanstack/react-query';

import type { PostTwoFactorAuthenticationRequestConfig } from '@/utils/api/requests/twoFactorAuthentication';
import { postTwoFactorAuthentication } from '@/utils/api/requests/twoFactorAuthentication';

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
