import { FormContainer } from './components/FormContainer/FormContainer';
import type { Stage } from './contexts/stage';
import Providers from './providers';

interface AuthPageProps {
  searchParams?: { stage?: Stage };
}

export const AuthPage = ({ searchParams }: AuthPageProps) => {
  const defaultStage = searchParams?.stage ?? 'signIn';

  return (
    <Providers stage={{ defaultStage }}>
      <FormContainer />
    </Providers>
  );
};
