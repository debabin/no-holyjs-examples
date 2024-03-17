import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux-saga-variant/redux/hooks';
import * as zod from 'zod';

import { authSagas } from '../../../sagas';
import { authActions, authSelectors } from '../../../slices';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.getSignInFormLoading);

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

  const onSubmit = signInForm.handleSubmit((values) =>
    dispatch(authSagas.onSignInSubmit.action({ values, resource: selectedResource }))
  );

  const goToSignUp = () => dispatch(authActions.setStage('signUp'));

  return {
    state: {
      loading,
      isEmail: selectedResource === 'email'
    },
    form: signInForm,
    functions: { onSubmit, goToSignUp }
  };
};
