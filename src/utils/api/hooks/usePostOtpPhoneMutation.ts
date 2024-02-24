import { useMutation } from '@tanstack/react-query';

import type { PostOtpPhoneRequestConfig } from '../requests/otp/phone';
import { postOtpPhone } from '../requests/otp/phone';

export const usePostOtpPhoneMutation = (
  settings?: MutationSettings<PostOtpPhoneRequestConfig, typeof postOtpPhone>
) =>
  useMutation({
    mutationKey: ['postOtpPhone'],
    mutationFn: ({ params, config }) =>
      postOtpPhone({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
