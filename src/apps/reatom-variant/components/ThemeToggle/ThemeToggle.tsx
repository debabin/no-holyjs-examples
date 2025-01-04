import { theme } from '@reatom-variant/model';
import { reatomComponent } from '@reatom/npm-react';

import { MoonIcon, SunIcon } from '@/components/icons';
import { Toggle } from '@/components/ui';

export const ThemeToggle = reatomComponent(
  ({ ctx }) => (
    <Toggle aria-label='toggle theme' variant='outline' onClick={ctx.bind(theme.toggle)}>
      {ctx.spy(theme) === 'light' && <SunIcon className='h-6 w-6 text-yellow-500' />}
      {ctx.spy(theme) === 'dark' && <MoonIcon className='h-6 w-6 text-gray-500' />}
    </Toggle>
  ),
  'ThemeToggle'
);
