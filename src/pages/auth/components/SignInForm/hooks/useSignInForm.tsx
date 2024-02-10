import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { usePostSignInEmailMutation, usePostSignInLoginMutation } from '@/utils/api';

import { useStage } from '../../../contexts';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const { setStage } = useStage();

  const [isEmail, setIsEmail] = React.useState(false);

  const signInForm = useForm<SingInForm>({
    defaultValues: {
      login: '',
      password: ''
    },
    resolver: zodResolver(isEmail ? signInEmailSchema : signInLoginSchema)
  });

  const login = signInForm.watch('login');
  React.useEffect(() => {
    const email = z.string().email();
    const isEmail = email.safeParse(login);
    setIsEmail(isEmail.success);
  }, [login]);

  const postSignInEmailMutation = usePostSignInEmailMutation();
  const postSignInLoginMutation = usePostSignInLoginMutation();

  const onSubmit = signInForm.handleSubmit(async (values) => {
    if (isEmail) {
      const postSingInEmailResponse = await postSignInEmailMutation.mutateAsync({
        params: { email: values.login }
      });
      console.log('@', postSingInEmailResponse);
    }

    const postSingInLoginResponse = await postSignInLoginMutation.mutateAsync({
      params: values
    });

    if (
      'needConfirmation' in postSingInLoginResponse.data &&
      postSingInLoginResponse.data.needConfirmation
    ) {
      return setStage('selectConfirmation');
    }

    console.log('@', toast);
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
      isEmail
    },
    form: signInForm,
    functions: { onSubmit, goToSignUp }
  };
};
