import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { usePostSignInMutation } from '@/utils/api';

import { useStage } from '../../../contexts';
import { signInSchema } from '../constants';

interface SingUpForm {
  email: string;
  password: string;
}

export const useSignInForm = () => {
  const router = useRouter();
  const { setStage } = useStage();

  const authForm = useForm<SingUpForm>({
    resolver: zodResolver(signInSchema)
  });
  const postSignInMutation = usePostSignInMutation({
    options: {
      onSuccess: () =>
        toast.success('Sign in is successful 👍', {
          cancel: { label: 'Close' },
          description: 'We are very glad to see you, have fun'
        })
    }
  });

  const onSubmit = authForm.handleSubmit(async (values) => {
    await postSignInMutation.mutate(values);
    router.replace('/profile');
  });

  const goToSignUp = () => setStage('signUp');

  return {
    state: { loading: postSignInMutation.isPending },
    form: authForm,
    functions: { onSubmit, goToSignUp }
  };
};
