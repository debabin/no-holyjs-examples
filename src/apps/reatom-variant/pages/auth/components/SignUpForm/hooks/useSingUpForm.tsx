import { zodResolver } from '@hookform/resolvers/zod';
import { useCtx } from '@reatom/npm-react';
import { useForm } from 'react-hook-form';

import { signUpSubmit, stageAtom } from '../../../model';
import { signUpSchema } from '../constants';
import { COUNTRIES } from '../constants/countries';

interface SingUpForm {
  email: string;
  firstName?: string;
  lastName?: string;
  login: string;
  password: string;
  passwordConfirmation: string;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

export const useSignUpForm = () => {
  const ctx = useCtx();

  const signUpForm = useForm<SingUpForm>({
    defaultValues: {
      country: COUNTRIES[0]
    },
    resolver: zodResolver(signUpSchema)
  });

  const goToSignIn = () => stageAtom(ctx, { value: 'signIn' });

  const onSubmit = signUpForm.handleSubmit((values) => signUpSubmit(ctx, { values }));

  const isPasswordsEqual =
    signUpForm.watch('password') === signUpForm.watch('passwordConfirmation');

  return {
    state: {
      isPasswordsEqual,
      countries: COUNTRIES
    },
    form: signUpForm,
    functions: { onSubmit, goToSignIn }
  };
};
