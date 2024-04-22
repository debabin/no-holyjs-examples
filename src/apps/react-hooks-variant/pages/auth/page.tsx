import { FormContainer } from './components/FormContainer/FormContainer';
import Providers from './providers';

export const AuthPage = () => (
  <Providers stage={{ defaultStage: 'signIn' }}>
    <FormContainer />
  </Providers>
);
