import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStage } from '../../../contexts';
import { confirmationSchema } from '../constants';

interface SingUpForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const { setStage } = useStage();

  const confirmationForm = useForm<SingUpForm>({
    resolver: zodResolver(confirmationSchema)
  });

  const onSubmit = confirmationForm.handleSubmit((values) => {
    console.log('@confirm', values);
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: { loading: false },
    form: confirmationForm,
    functions: { onSubmit, goToSignUp }
  };
};
