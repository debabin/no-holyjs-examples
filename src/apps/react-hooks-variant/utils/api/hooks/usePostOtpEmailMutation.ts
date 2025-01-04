import { useMutation } from '@tanstack/react-query';

import type { PostOtpEmailRequestConfig } from '@/utils/api/requests/otp/email';

import { postOtpEmail } from '@/utils/api/requests/otp/email';

export const usePostOtpEmailMutation = (
  settings?: MutationSettings<PostOtpEmailRequestConfig, typeof postOtpEmail>
) =>
  useMutation({
    mutationKey: ['postOtpEmail'],
    mutationFn: ({ params, config }) =>
      postOtpEmail({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
