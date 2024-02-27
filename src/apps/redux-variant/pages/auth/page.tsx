import { useSelector } from '@redux-variant/redux/hooks';

import { ConfirmationForm } from './components/ConfirmationForm/ConfirmationForm';
import { SelectConfirmationForm } from './components/SelectConfirmationForm/SelectConfirmationForm';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { getStage } from './slices/stage/selector';
import type { Stage } from './slices/stage/slice';

const component: Record<Stage, React.ReactNode> = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
  selectConfirmation: <SelectConfirmationForm />,
  confirmation: <ConfirmationForm />
};

const AuthPage = () => {
  const stage = useSelector(getStage);

  return component[stage];
};

export default AuthPage;
