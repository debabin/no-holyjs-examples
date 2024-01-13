'use client';

import React from 'react';

import { useStage } from '../../contexts';
import { SignInForm } from '../AuthForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';

export const FormContainer = () => {
  const { stage } = useStage();

  return (
    <>
      {stage === 'signIn' && <SignInForm />}
      {stage === 'signUp' && <SignUpForm />}
    </>
  );
};
