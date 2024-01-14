'use client';

import React from 'react';

import { useStage } from '../../contexts';
import { ConfirmationForm } from '../ConfirmationForm/ConfirmationForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';

export const FormContainer = () => {
  const { stage } = useStage();

  return (
    <>
      {stage === 'signIn' && <SignInForm />}
      {stage === 'signUp' && <SignUpForm />}
      {stage === 'confirmation' && <ConfirmationForm />}
    </>
  );
};
