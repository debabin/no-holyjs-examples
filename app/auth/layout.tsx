import { GithubIcon } from '@/components/icons';

import { ThemeToggle } from './ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <>
    <header className='flex items-center justify-between p-4'>
      <div>
        <GithubIcon className='h-6 w-6 text-gray-900 dark:text-gray-100' />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>

    <div>{children}</div>
  </>
);

export default AuthLayout;
