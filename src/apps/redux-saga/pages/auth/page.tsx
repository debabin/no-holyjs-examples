import { FormContainer } from './components/FormContainer/FormContainer';

import Providers from './providers';

// routing guards
// registration profile more fields + registration password rules
// o2auth github google

const AuthPage = () => {
  // const defaultStage = searchParams?.stage ?? 'signIn';

  return (
    <Providers>
      <FormContainer />
    </Providers>
  );
};

export default AuthPage;
