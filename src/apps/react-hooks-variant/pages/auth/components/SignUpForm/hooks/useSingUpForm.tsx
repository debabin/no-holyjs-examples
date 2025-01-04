import { zodResolver } from '@hookform/resolvers/zod';
import { usePostSingUpMutation } from '@react-hooks-variant/utils/api';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useStage } from '../../../contexts/stage';
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
  const { setStage } = useStage();

  const signUpForm = useForm<SingUpForm>({
    defaultValues: {
      country: COUNTRIES[0]
    },
    resolver: zodResolver(signUpSchema)
  });

  const postSingUpMutation = usePostSingUpMutation({
    options: {
      onSuccess: () =>
        toast.success('Your account has been created 👍', {
          cancel: { label: 'Close' },
          description: 'We are very glad to see you, have fun'
        })
    }
  });

  const goToSignIn = () => setStage('signIn');

  const onSubmit = signUpForm.handleSubmit(async () => {
    const { passwordConfirmation, ...values } = signUpForm.getValues();

    await postSingUpMutation.mutateAsync({ params: values });
    goToSignIn();
  });

  const isPasswordsEqual =
    signUpForm.watch('password') === signUpForm.watch('passwordConfirmation');

  return {
    state: {
      loading: postSingUpMutation.isPending,
      isPasswordsEqual,
      countries: COUNTRIES
    },
    form: signUpForm,
    functions: { onSubmit, goToSignIn }
  };
};
