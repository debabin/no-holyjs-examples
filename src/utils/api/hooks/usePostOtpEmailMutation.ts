import { useMutation } from '@tanstack/react-query';

import type { PostOtpEmailConfig } from '../requests/otp/email';
import { postOtpEmail } from '../requests/otp/email';

export const usePostOtpEmailMutation = (
  settings?: MutationSettings<PostOtpEmailConfig, typeof postOtpEmail>
) =>
  useMutation({
    mutationKey: ['postOtpEmail'],
    mutationFn: (params) =>
      postOtpEmail({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options
  });
