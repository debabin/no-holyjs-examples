import type { CheckedState } from '@radix-ui/react-checkbox';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePostOtpEmailMutation, usePostOtpPhoneMutation } from '@react-hooks-variant/utils/api';
import React from 'react';
import { useForm } from 'react-hook-form';

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
    'form' | 'select'
  >('select');
  const [selectedResource, setSelectedResource] = React.useState<'email' | 'phone'>('phone');
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
