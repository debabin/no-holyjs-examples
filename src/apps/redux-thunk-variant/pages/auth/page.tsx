import { useSelector } from 'react-redux';

import { ConfirmationForm } from './components/ConfirmationForm/ConfirmationForm';
import { SelectConfirmationForm } from './components/SelectConfirmationForm/SelectConfirmationForm';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import type { Stage } from './slices/stage/slice';
import { authSelectors } from './slices';

const component: Record<Stage, React.ReactNode> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <SelectConfirmationForm />,
  confirmation: <ConfirmationForm />
};

export const AuthPage = () => {
  const stage = useSelector(authSelectors.getStage);

  return component[stage];
};
