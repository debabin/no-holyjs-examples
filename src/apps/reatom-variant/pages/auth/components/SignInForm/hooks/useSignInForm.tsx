import { zodResolver } from '@hookform/resolvers/zod';
import { useCtx } from '@reatom/npm-react';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as zod from 'zod';

import { signInSubmit, stageAtom } from '../../../model';
import { signInEmailSchema, signInLoginSchema } from '../constants';

interface SingInForm {
  login: string;
  password: string;
}

export const useSignInForm = () => {
  const ctx = useCtx();

  const [selectedResource, setSelectedResource] = React.useState<'email' | 'login'>('login');

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
    signInSubmit(ctx, { values, resource: selectedResource })
  );

  const goToSignUp = () => stageAtom(ctx, { value: 'signUp' });

  return {
    state: {
      isEmail: selectedResource === 'email'
    },
    form: signInForm,
    functions: { onSubmit, goToSignUp }
  };
};
