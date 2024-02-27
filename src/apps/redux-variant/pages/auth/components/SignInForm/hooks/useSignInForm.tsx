import React from 'react';
import { flushSync } from 'react-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { onSignInSubmit } from '@/pages/auth/sagas';
import { useDispatch } from '@redux-variant/redux/hooks';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import * as zod from 'zod';

import { COOKIE } from '@/utils';
import {
  usePostOtpEmailMutation,
  usePostSignInEmailMutation,
  usePostSignInLoginMutation
} from '@/utils/api';
import { useProfile } from '@/utils/contexts/profile';
import { useSession } from '@/utils/contexts/session';

import { authActions } from '../../../slices';
import { signInForm as signInFormSlice } from '../../../slices/signInForm/slice';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setSession } = useSession();
  const { setProfile } = useProfile();

  const [selectedResource, setSelectedResource] = React.useState<'login' | 'email'>('login');

  const signInForm = useForm<SingInForm>({
    resolver: zodResolver(selectedResource === 'email' ? signInEmailSchema : signInLoginSchema)
  });

  const login = useWatch({ control: signInForm.control, name: 'login' });
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
    // dispatch(onSignInSubmit.action());

    signInFormSlice.submitHandler();

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

      authActions.setOtp({
        type: 'email',
        resource: values.login,
        retryDelay: postOtpEmailMutationResponse.data.retryDelay
      });
      return dispatch(authActions.setStage('confirmation'));
    }

    if (
      'needConfirmation' in postSignInMutationResponse.data &&
      postSignInMutationResponse.data.needConfirmation &&
      selectedResource === 'login'
    ) {
      return dispatch(authActions.setStage('selectConfirmation'));
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

  const goToSignUp = () => dispatch(authActions.setStage('signUp'));

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
