import { ThemeToggle } from '@redux-thunk-variant/components/ThemeToggle/ThemeToggle';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';

import cftIcon from '@/assets/images/cft.svg';
import sibericancodeIcon from '@/assets/images/sibericancode.svg';

interface RouterContext {
  isAuthenticated: boolean;
}

const TOASTER_DURATION = 5000;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <header className='absolute flex w-full items-center justify-between p-4'>
        <div className='flex items-center gap-2'>
          <img className='size-10 rounded' src={sibericancodeIcon} alt='sibericancode icon' />
          <div className='text-2xl font-bold'>+</div>
          <img className='w-28 rounded' src={cftIcon} alt='cft icon' />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <div className='flex h-screen items-center justify-center p-4'>
        <Outlet />
      </div>
      <Toaster duration={TOASTER_DURATION} />
      <TanStackRouterDevtools />
    </>
  )
});
