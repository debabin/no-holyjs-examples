import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from '@redux-thunk-variant/redux/hooks';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

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

  const onSubmit = confirmationForm.handleSubmit(async (values) => {
    const { payload }: any = await dispatch(authThunks.onConfirmationSubmit.thunk({ values }));

    if (payload.response.data.message) {
      confirmationForm.setError('otp', { message: payload.response.data.message });
    }
  });

  const goToSignUp = () => dispatch(authActions.setStage('signUp'));

  return {
    state: {
      loading: loading && confirmationForm.formState.isSubmitting,
      otp,
      seconds: otpCountdown.seconds
    },
    form: confirmationForm,
    functions: { onSubmit, goToSignUp, onOtpResend }
  };
};
