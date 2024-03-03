import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux-thunk-variant/redux/hooks';

import { authActions, authSelectors } from '../../../slices';
import { authThunks } from '../../../thunks';
import { confirmationSchema } from '../constants';

interface ConfirmationFormForm {
  otp: string;
}

export const useConfirmationForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.getConfirmationFormLoading);

  const otp = useSelector(authSelectors.getOtp);
  const otpCountdown = useSelector(authSelectors.getOtpCountdown);

  const confirmationForm = useForm<ConfirmationFormForm>({
    resolver: zodResolver(confirmationSchema),
    reValidateMode: 'onSubmit'
  });

  const onOtpResend = () => dispatch(authThunks.onOtpResend.thunk());

  const onSubmit = confirmationForm.handleSubmit((values) =>
    dispatch(authThunks.onConfirmationSubmit.thunk({ values }))
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
