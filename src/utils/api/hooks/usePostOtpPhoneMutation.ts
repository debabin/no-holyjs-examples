import { useMutation } from '@tanstack/react-query';

import type { PostOtpPhoneConfig } from '../requests/otp/phone';
import { postOtpPhone } from '../requests/otp/phone';

export const usePostOtpPhoneMutation = (
  settings?: MutationSettings<PostOtpPhoneConfig, typeof postOtpPhone>
) =>
  useMutation({
    mutationKey: ['postOtpPhone'],
    mutationFn: (params) =>
      postOtpPhone({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options
  });
