import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { GithubIcon } from '@/components/icons';

import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';

export const Route = createRootRoute({
  component: () => (
    <>
      <header className='flex items-center justify-between p-4'>
        <div>
          <GithubIcon className='size-6 text-gray-900 dark:text-gray-100' />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
});
