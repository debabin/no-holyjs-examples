import React from 'react';

export const MoonIcon = React.forwardRef<SVGSVGElement, React.ComponentProps<'svg'>>(
  (props, ref) => (
    <svg
      fill='none'
      height='24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      {...props}
      ref={ref}
    >
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </svg>
  )
);
