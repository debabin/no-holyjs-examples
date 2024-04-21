import { reatomComponent } from '@reatom/npm-react';
import { theme } from '@reatom-variant/model';

import { MoonIcon, SunIcon } from '@/components/icons';
import { Toggle } from '@/components/ui';

export const ThemeToggle = reatomComponent(({ ctx }) => {
  const themeValue = ctx.spy(theme);
  const onToggleClick = () => theme.toggle(ctx);

  return (
    <Toggle aria-label='toggle theme' variant='outline' onClick={onToggleClick}>
      {themeValue === 'light' && <SunIcon className='h-6 w-6 text-yellow-500' />}
      {themeValue === 'dark' && <MoonIcon className='h-6 w-6 text-gray-500' />}
    </Toggle>
  );
}, 'ThemeToggle');
