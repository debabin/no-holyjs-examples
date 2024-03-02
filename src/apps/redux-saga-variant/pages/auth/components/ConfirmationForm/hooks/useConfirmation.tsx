import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux-saga-variant/redux/hooks';

import { authSagas } from '../../../sagas';
import { authActions, authSelectors } from '../../../slices';
import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.getConfirmationFromLoading);

  const otp = useSelector(authSelectors.getOtp);
  const otpCountdown = useSelector(authSelectors.getOtpCountdown);

  const confirmationForm = useForm<ConfirmationFormForm>({
    resolver: zodResolver(confirmationSchema),
    reValidateMode: 'onSubmit'
  });

  const onOtpResend = () => dispatch(authSagas.onOtpResend.action());

  const onSubmit = confirmationForm.handleSubmit((values) =>
    dispatch(authSagas.onConfirmationSubmit.action({ values }))
  );

  const goToSignUp = () => dispatch(authActions.setStage('signUp'));

  return {
    state: {
      loading,
      otp,
      seconds: otpCountdown.seconds
    },
    form: confirmationForm,
    functions: { onSubmit, goToSignUp, onOtpResend }
  };
};
