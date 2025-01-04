import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const confirmationForm = useForm<ConfirmationFormForm>({
    resolver: zodResolver(confirmationSchema),
    reValidateMode: 'onSubmit'
  });

  return {
    form: confirmationForm
  };
};
