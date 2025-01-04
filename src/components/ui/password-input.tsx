import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/utils';

import type { InputProps } from './input';

import { Button } from './button';
import { Input } from './input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        ref={ref}
        className={cn('pr-10', className)}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <Button
        className='absolute right-0 top-0  h-full px-3 py-2 hover:bg-transparent'
        disabled={!props.value || props.disabled}
        size='sm'
        type='button'
        variant='ghost'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon aria-hidden='true' className='h-4 w-4' />
        ) : (
          <EyeIcon aria-hidden='true' className='h-4 w-4' />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
