import React from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  usePostOtpEmailMutation,
  usePostOtpPhoneMutation,
  usePostTwoFactorAuthenticationMutation
} from '@react-hooks-variant/utils/api';
import { useProfile } from '@react-hooks-variant/utils/contexts/profile';
import { useSession } from '@react-hooks-variant/utils/contexts/session';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { COOKIE, ROUTES } from '@/utils';

import { useOtp } from '../../../contexts/otp';
import { useStage } from '../../../contexts/stage';
import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const { setStage } = useStage();
  const navigate = useNavigate();
  const { otp, setOtp } = useOtp();
  const { setSession } = useSession();
  const { setProfile } = useProfile();

  const countDownRef = React.useRef<NodeJS.Timeout>();
  const [seconds, setSeconds] = React.useState(otp.retryDelay / 1000);

  const postOtpEmailMutation = usePostOtpEmailMutation();
  const postOtpPhoneMutation = usePostOtpPhoneMutation();
  const postOtpMutation = otp.type === 'email' ? postOtpEmailMutation : postOtpPhoneMutation;

  const confirmationForm = useForm<ConfirmationFormForm>({
    resolver: zodResolver(confirmationSchema),
    reValidateMode: 'onSubmit'
  });

  const postTwoFactorAuthenticationMutation = usePostTwoFactorAuthenticationMutation({
    options: {
      onError: () => confirmationForm.setError('otp', { message: 'Invalid OTP' }),
      onSuccess: () =>
        toast.success('Sign in is successful 👍', {
          cancel: { label: 'Close' },
          description: 'We are very glad to see you, have fun'
        })
    }
  });

  const onOtpResend = async () => {
    const postOtpMutationResponse = await postOtpMutation.mutateAsync({
      params: { [otp.type]: otp.resource } as Record<'email' | 'phone', string>
    });
    if (postOtpMutationResponse.data.retryDelay) {
      setSeconds(postOtpMutationResponse.data.retryDelay / 1000);
      setOtp({
        ...otp,
        retryDelay: postOtpMutationResponse.data.retryDelay
      });
      setStage('confirmation');
    }
  };

  React.useEffect(() => {
    if (!seconds) return;
    countDownRef.current = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    return () => clearInterval(countDownRef.current);
  }, [!!seconds]);

  React.useEffect(() => {
    if (!seconds) clearInterval(countDownRef.current);
  }, [seconds]);

  const onSubmit = confirmationForm.handleSubmit(async (values) => {
    const postTwoFactorAuthenticationMutationResponse =
      await postTwoFactorAuthenticationMutation.mutateAsync({
        params: {
          otp: values.otp,
          source: otp.resource
        }
      });

    if ('profile' in postTwoFactorAuthenticationMutationResponse.data) {
      localStorage.setItem(
        COOKIE.ACCESS_TOKEN,
        postTwoFactorAuthenticationMutationResponse.data.token
      );
      setProfile(postTwoFactorAuthenticationMutationResponse.data.profile);
      flushSync(() => setSession(true));
      console.log('@');

      navigate({
        to: ROUTES.INDEX,
        replace: true
      });
    }
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: {
      loading: postOtpMutation.isPending || postTwoFactorAuthenticationMutation.isPending,
      otp,
      seconds
    },
    form: confirmationForm,
    functions: { onSubmit, goToSignUp, onOtpResend }
  };
};
