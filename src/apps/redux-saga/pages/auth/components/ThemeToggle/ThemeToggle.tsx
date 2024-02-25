import { MoonIcon, SunIcon } from '@/components/icons';
import { Toggle } from '@/components/ui';
import { useTheme } from '@/utils/contexts/theme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const onToggleClick = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Toggle aria-label='toggle theme' variant='outline' onClick={onToggleClick}>
      {theme === 'light' && <SunIcon className='h-6 w-6 text-yellow-500' />}
      {theme === 'dark' && <MoonIcon className='h-6 w-6 text-gray-500' />}
    </Toggle>
  );
};
