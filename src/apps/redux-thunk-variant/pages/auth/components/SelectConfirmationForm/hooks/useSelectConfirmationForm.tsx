import type { CheckedState } from '@radix-ui/react-checkbox';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useDispatch } from '@/apps/redux-thunk-variant/redux/hooks';

import { authSelectors } from '../../../slices';
import { authThunks } from '../../../thunks';
import { selectConfirmationEmailSchema, selectConfirmationPhoneSchema } from '../constants';

interface SelectConfirmationForm {
  resource: string;
}

export const useSelectConfirmationForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.getSelectConfirmationFormLoading);

  const [selectConfirmationFormStage, setSelectConfirmationFormStage] = React.useState<
    'form' | 'select'
  >('select');
  const [selectedResource, setSelectedResource] = React.useState<'email' | 'phone'>('phone');
  const [termsChecked, setTermsChecked] = React.useState<CheckedState>(false);

  const onSelectContinue = () => setSelectConfirmationFormStage('form');

  const selectConfirmationForm = useForm<SelectConfirmationForm>({
    resolver: zodResolver(
      selectedResource === 'email' ? selectConfirmationEmailSchema : selectConfirmationPhoneSchema
    )
  });
  const onFormBack = () => {
    selectConfirmationForm.reset();
    setSelectConfirmationFormStage('select');
  };

  const onSubmit = selectConfirmationForm.handleSubmit((values) =>
    dispatch(authThunks.onSelectConfirmationSubmit.thunk({ values, selectedResource }))
  );

  return {
    form: selectConfirmationForm,
    state: {
      termsChecked,
      selectedResource,
      selectConfirmationFormStage,
      loading
    },
    functions: { setTermsChecked, setSelectedResource, onSelectContinue, onFormBack, onSubmit }
  };
};
