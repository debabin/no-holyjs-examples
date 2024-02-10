import type { Stage } from '../../contexts';
import { useStage } from '../../contexts';
import { ConfirmationForm } from '../ConfirmationForm/ConfirmationForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';

const component: Record<Stage, React.ReactNode> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <ConfirmationForm />,
  confirmation: <ConfirmationForm />
};

export const FormContainer = () => {
  const { stage } = useStage();

  return component[stage];
};
