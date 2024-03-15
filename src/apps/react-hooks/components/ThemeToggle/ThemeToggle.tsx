import { useTheme } from '@react-hooks/utils/contexts/theme';

import { MoonIcon, SunIcon } from '@/components/icons';
import { Toggle } from '@/components/ui';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const onToggleClick = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Toggle aria-label='toggle theme' onClick={onToggleClick}>
      {theme === 'light' && <SunIcon className='size-6' />}
      {theme === 'dark' && <MoonIcon className='size-6' />}
    </Toggle>
  );
};
