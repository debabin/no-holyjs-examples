import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux-thunk-variant/redux/hooks';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../../slices';
import { stageSlice } from '../../../slices/stage/slice';
import { authThunks } from '../../../thunks';
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
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.getSignUpFormLoading);

  const signUpForm = useForm<SingUpForm>({
    defaultValues: {
      country: COUNTRIES[0]
    },
    resolver: zodResolver(signUpSchema)
  });

  const goToSignIn = () => dispatch(stageSlice.actions.setStage('signIn'));

  const onSubmit = signUpForm.handleSubmit((values) =>
    dispatch(authThunks.onSignUpSubmit.thunk({ values }))
  );

  const isPasswordsEqual =
    signUpForm.watch('password') === signUpForm.watch('passwordConfirmation');

  return {
    state: {
      loading,
      isPasswordsEqual,
      countries: COUNTRIES
    },
    form: signUpForm,
    functions: { onSubmit, goToSignIn }
  };
};
