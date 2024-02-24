import { FormContainer } from './components/FormContainer/FormContainer';
import type { Stage } from './contexts/stage';
import Providers from './providers';

interface AuthPageProps {
  searchParams?: { stage?: Stage };
}

// routing guards
// registration profile more fields + registration password rules
// o2auth github google

const AuthPage = ({ searchParams }: AuthPageProps) => {
  const defaultStage = searchParams?.stage ?? 'signIn';

  return (
    <Providers stage={{ defaultStage }}>
      <FormContainer />
    </Providers>
  );
};

export default AuthPage;
