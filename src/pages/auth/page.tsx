import { FormContainer } from './components/FormContainer/FormContainer';
import type { Stage } from './contexts/stage';
import Providers from './providers';

interface AuthPageProps {
  searchParams?: { stage?: Stage };
}

const AuthPage = ({ searchParams }: AuthPageProps) => {
  const defaultStage = searchParams?.stage ?? 'signIn';

  return (
    <div className='lg:p-8'>
      <Providers stage={{ defaultStage }}>
        <FormContainer />
      </Providers>
    </div>
  );
};

export default AuthPage;
