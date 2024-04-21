import { ThemeToggle } from '@reatom-variant/components/ThemeToggle/ThemeToggle';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

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
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <div className='flex h-screen items-center justify-center p-4'>
        <Outlet />
      </div>
      <Toaster duration={TOASTER_DURATION} />
    </>
  )
});
