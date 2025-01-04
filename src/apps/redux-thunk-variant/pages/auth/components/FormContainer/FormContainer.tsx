import { useSelector } from 'react-redux';

import type { Stage } from '../../slices/stage/slice';

import { authSelectors } from '../../slices';
import { ConfirmationForm } from '../ConfirmationForm/ConfirmationForm';
import { SelectConfirmationForm } from '../SelectConfirmationForm/SelectConfirmationForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';

const component: Record<Stage, React.ReactNode> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <SelectConfirmationForm />,
  confirmation: <ConfirmationForm />
};

export const FormContainer = () => {
  const stage = useSelector(authSelectors.getStage);

  return component[stage];
};
