import { useSelector } from 'react-redux';
import { useDispatch } from '@redux-thunk-variant/redux/hooks';
import { themeSlice } from '@redux-thunk-variant/redux/slices/theme/slice';

import { MoonIcon, SunIcon } from '@/components/icons';
import { Toggle } from '@/components/ui';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSlice.selectors.getTheme);

  const onToggleClick = () =>
    dispatch(themeSlice.actions.setTheme(theme === 'light' ? 'dark' : 'light'));

  return (
    <Toggle aria-label='toggle theme' variant='outline' onClick={onToggleClick}>
      {theme === 'light' && <SunIcon className='h-6 w-6 text-yellow-500' />}
      {theme === 'dark' && <MoonIcon className='h-6 w-6 text-gray-500' />}
    </Toggle>
  );
};
