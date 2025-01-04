import React from 'react';

export const EyeIcon = React.forwardRef<SVGSVGElement, React.ComponentProps<'svg'>>(
  (props, ref) => (
    <svg
      fill='currentColor'
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
      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  )
);
