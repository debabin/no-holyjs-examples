import React from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux/hooks';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { COOKIE } from '@/utils';
import {
  usePostOtpEmailMutation,
  usePostOtpPhoneMutation,
  usePostTwoFactorAuthenticationMutation
} from '@/utils/api';
import { useProfile } from '@/utils/contexts/profile';
import { useSession } from '@/utils/contexts/session';

import { useOtp } from '../../../contexts/otp';
import { stageSlice } from '../../../slices/stage/slice';
import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const dispatch = useDispatch();

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
      dispatch(stageSlice.actions.setStage('confirmation'));
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

      navigate({
        to: '/',
        replace: true
      });
    }
  });

  const goToSignUp = () => dispatch(stageSlice.actions.setStage('signUp'));

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
