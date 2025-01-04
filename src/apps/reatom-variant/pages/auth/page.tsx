import { reatomComponent } from '@reatom/npm-react';
import React from 'react';

import type { Stage } from './model';

import { ConfirmationForm } from './components/ConfirmationForm/ConfirmationForm';
import { SelectConfirmationForm } from './components/SelectConfirmationForm/SelectConfirmationForm';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { stageAtom } from './model';

const component: Record<Stage, React.ReactNode> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <SelectConfirmationForm />,
  confirmation: <ConfirmationForm />
};

export const AuthPage = reatomComponent(
  ({ ctx }) => component[ctx.spy(stageAtom).value],
  'AuthPage'
);
