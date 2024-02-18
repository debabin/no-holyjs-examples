import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import {
  usePostOtpEmailMutation,
  usePostSignInEmailMutation,
  usePostSignInLoginMutation
} from '@/utils/api';

import { useOtp } from '../../../contexts/otp';
import { useStage } from '../../../contexts/stage';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const { setOtp } = useOtp();
  const { setStage } = useStage();

  const [selectedResource, setSelectedResource] = React.useState<'login' | 'email'>('login');

  const signInForm = useForm<SingInForm>({
    defaultValues: {
      login: '',
      password: ''
    },
    resolver: zodResolver(selectedResource === 'email' ? signInEmailSchema : signInLoginSchema)
  });

  const login = signInForm.watch('login');
  React.useEffect(() => {
    const email = z.string().email();
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
      params: { [selectedResource]: values.login } as Record<'email' | 'login', string>
    });

    if (
      'needConfirmation' in postSignInMutationResponse.data &&
      postSignInMutationResponse.data.needConfirmation &&
      selectedResource === 'email'
    ) {
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

    toast.success('Sign in is successful 👍', {
      cancel: { label: 'Close' },
      description: 'We are very glad to see you, have fun'
    });

    // router.replace('/profile');
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: {
      loading: postSignInEmailMutation.isPending || postSignInLoginMutation.isPending,
      isEmail: selectedResource === 'email'
    },
    form: signInForm,
    functions: { onSubmit, goToSignUp }
  };
};
