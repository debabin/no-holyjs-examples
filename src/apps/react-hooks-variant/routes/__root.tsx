import { ThemeToggle } from '@react-hooks-variant/components';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';

import sibericancodeIcon from '@/assets/images/sibericancode.svg';

interface RouterContext {
  isAuthenticated: boolean;
}

const TOASTER_DURATION = 5000;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <header className='absolute z-[30] flex w-full items-center justify-between p-4'>
        <div className='flex items-center gap-2'>
          <img alt='sibericancode icon' className='size-10 rounded' src={sibericancodeIcon} />
          <span>react-hooks</span>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <div className='flex h-screen items-center justify-center'>
        <Outlet />
      </div>
      <Toaster duration={TOASTER_DURATION} />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
});
