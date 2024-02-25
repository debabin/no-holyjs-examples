import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CheckedState } from '@radix-ui/react-checkbox';

import { usePostOtpEmailMutation, usePostOtpPhoneMutation } from '@/utils/api';

import { useOtp } from '../../../contexts/otp';
import { useStage } from '../../../contexts/stage';
import { selectConfirmationEmailSchema, selectConfirmationPhoneSchema } from '../constants';

interface SelectConfirmationForm {
  resource: string;
}

export const useSelectConfirmationForm = () => {
  const { setOtp } = useOtp();
  const { setStage } = useStage();

  const [selectConfirmationFormStage, setSelectConfirmationFormStage] = React.useState<
    'select' | 'form'
  >('select');
  const [selectedResource, setSelectedResource] = React.useState<'phone' | 'email'>('phone');
  const [termsChecked, setTermsChecked] = React.useState<CheckedState>(false);

  const onSelectContinue = () => setSelectConfirmationFormStage('form');

  const postOtpEmailMutation = usePostOtpEmailMutation();
  const postOtpPhoneMutation = usePostOtpPhoneMutation();
  const postOtpMutation =
    selectedResource === 'email' ? postOtpEmailMutation : postOtpPhoneMutation;

  const selectConfirmationForm = useForm<SelectConfirmationForm>({
    resolver: zodResolver(
      selectedResource === 'email' ? selectConfirmationEmailSchema : selectConfirmationPhoneSchema
    )
  });
  const onFormBack = () => {
    selectConfirmationForm.reset();
    setSelectConfirmationFormStage('select');
  };
  const onSubmit = selectConfirmationForm.handleSubmit(async (values) => {
    const postOtpMutationResponse = await postOtpMutation.mutateAsync({
      params: { [selectedResource]: values.resource } as Record<'email' | 'phone', string>
    });
    if (postOtpMutationResponse.data.retryDelay) {
      setOtp({
        type: selectedResource,
        resource: values.resource,
        retryDelay: postOtpMutationResponse.data.retryDelay
      });
      setStage('confirmation');
    }
  });

  return {
    form: selectConfirmationForm,
    state: {
      termsChecked,
      selectedResource,
      selectConfirmationFormStage,
      loading: postOtpMutation.isPending
    },
    functions: { setTermsChecked, setSelectedResource, onSelectContinue, onFormBack, onSubmit }
  };
};
