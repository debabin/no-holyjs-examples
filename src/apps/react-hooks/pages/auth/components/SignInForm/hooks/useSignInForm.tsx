import React from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  usePostOtpEmailMutation,
  usePostSignInEmailMutation,
  usePostSignInLoginMutation
} from '@react-hooks/utils/api';
import { useProfile } from '@react-hooks/utils/contexts/profile';
import { useSession } from '@react-hooks/utils/contexts/session';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import * as zod from 'zod';

import { COOKIE } from '@/utils';

import { useOtp } from '../../../contexts/otp';
import { useStage } from '../../../contexts/stage';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const navigate = useNavigate();
  const { setOtp } = useOtp();
  const { setStage } = useStage();
  const { setSession } = useSession();
  const { setProfile } = useProfile();

  const [selectedResource, setSelectedResource] = React.useState<'login' | 'email'>('login');

  const signInForm = useForm<SingInForm>({
    resolver: zodResolver(selectedResource === 'email' ? signInEmailSchema : signInLoginSchema)
  });

  const login = signInForm.watch('login');
  React.useEffect(() => {
    const email = zod.string().email();
    const isEmail = email.safeParse(login);
    setSelectedResource(isEmail.success ? 'email' : 'login');
  }, [login]);

  const postOtpEmailMutation = usePostOtpEmailMutation();

  const postSignInEmailMutation = usePostSignInEmailMutation();
  const postSignInLoginMutation = usePostSignInLoginMutation();
  const postSignInMutation =
    selectedResource === 'email' ? postSignInEmailMutation : postSignInLoginMutation;

  const onSubmit = signInForm.handleSubmit(async (values) => {
    const postSignInMutationResponse = await postSignInMutation.mutateAsync({
      params: {
        [selectedResource]: values.login,
        ...(selectedResource === 'login' && { password: values.password })
      } as Record<'email' | 'login', string>
    });

    if (selectedResource === 'email') {
      const postOtpEmailMutationResponse = await postOtpEmailMutation.mutateAsync({
        params: { email: values.login }
      });

      if (!postOtpEmailMutationResponse.data.retryDelay) {
        return;
      }

      setOtp({
        type: 'email',
        resource: values.login,
        retryDelay: postOtpEmailMutationResponse.data.retryDelay
      });
      return setStage('confirmation');
    }

    if (
      'needConfirmation' in postSignInMutationResponse.data &&
      postSignInMutationResponse.data.needConfirmation &&
      selectedResource === 'login'
    ) {
      return setStage('selectConfirmation');
    }

    if ('profile' in postSignInMutationResponse.data) {
      localStorage.setItem(COOKIE.ACCESS_TOKEN, postSignInMutationResponse.data.token);
      setProfile(postSignInMutationResponse.data.profile);
      flushSync(() => setSession(true));

      toast.success('Sign in is successful 👍', {
        cancel: { label: 'Close' },
        description: 'We are very glad to see you, have fun'
      });

      navigate({
        to: '/',
        replace: true
      });
    }
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: {
      loading:
        postSignInEmailMutation.isPending ||
        postSignInLoginMutation.isPending ||
        postOtpEmailMutation.isPending,
      isEmail: selectedResource === 'email'
    },
    form: signInForm,
    functions: { onSubmit, goToSignUp }
  };
};
