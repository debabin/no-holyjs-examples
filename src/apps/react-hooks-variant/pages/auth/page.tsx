import { IDS } from '@/utils';

import { FormContainer } from './components/FormContainer/FormContainer';
import Providers from './providers';

export const AuthPage = () => (
  <section id={IDS.PAGE.AUTH}>
    <Providers stage={{ defaultStage: 'signIn' }}>
      <FormContainer />
    </Providers>
  </section>
);
