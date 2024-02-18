import type { Stage } from '../../contexts/stage';
import { useStage } from '../../contexts/stage';
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
  const { stage } = useStage();

  return component[stage];
};
