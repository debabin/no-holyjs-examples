import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { usePostSingUpMutation } from '@/utils/api';

import { useStage } from '../../../contexts/stage';
import { signUpSchema } from '../constants';

interface SingUpForm {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

export const useSignUpForm = () => {
  const { setStage } = useStage();
  const signUpForm = useForm<SingUpForm>({
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

  const onSubmit = signUpForm.handleSubmit(async ({ passwordConfirmation, ...values }) => {
    await postSingUpMutation.mutateAsync(values);
    goToSignIn();
  });

  const isPasswordsEqual =
    signUpForm.watch('password') === signUpForm.watch('passwordConfirmation');

  return {
    state: { loading: postSingUpMutation.isPending, isPasswordsEqual },
    form: signUpForm,
    functions: { onSubmit, goToSignIn }
  };
};
