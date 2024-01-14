import type { Metadata } from 'next';
import Link from 'next/link';

import { FormContainer } from './components/FormContainer/FormContainer';
import type { Stage } from './contexts';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

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

      <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
        By clicking continue, you agree to our{' '}
        <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default AuthPage;
