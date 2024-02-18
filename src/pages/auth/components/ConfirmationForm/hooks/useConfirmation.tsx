import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useOtp } from '@/pages/auth/contexts/otp';
import { usePostOtpEmailMutation, usePostOtpPhoneMutation } from '@/utils/api';

import { useStage } from '../../../contexts/stage';
import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const { otp, setOtp } = useOtp();
  const { setStage } = useStage();

  const countDownRef = React.useRef<NodeJS.Timeout>();
  const [seconds, setSeconds] = React.useState(otp.retryDelay / 1000);

  const postOtpEmailMutation = usePostOtpEmailMutation();
  const postOtpPhoneMutation = usePostOtpPhoneMutation();
  const postOtpMutation = otp.type === 'email' ? postOtpEmailMutation : postOtpPhoneMutation;

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

  const confirmationForm = useForm<ConfirmationFormForm>({
    resolver: zodResolver(confirmationSchema)
  });

  const onSubmit = confirmationForm.handleSubmit((values) => {
    console.log('@confirm', values);
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: { loading: postOtpMutation.isPending, otp, seconds },
    form: confirmationForm,
    functions: { onSubmit, goToSignUp, onOtpResend }
  };
};
