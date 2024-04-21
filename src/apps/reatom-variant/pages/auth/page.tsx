import React from 'react';
import { reatomComponent } from '@reatom/npm-react';

import { ConfirmationForm } from './components/ConfirmationForm/ConfirmationForm';
import { SelectConfirmationForm } from './components/SelectConfirmationForm/SelectConfirmationForm';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { stage } from './model';

const component: Record<
  'signIn' | 'signUp' | 'selectConfirmation' | 'confirmation',
  React.ReactNode
> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <SelectConfirmationForm />,
  confirmation: <ConfirmationForm />
};

export const AuthPage = reatomComponent(({ ctx }) => component[ctx.spy(stage).value], 'AuthPage');
