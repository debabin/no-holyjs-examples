import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    screens: {
      '2xlx': { max: '1400px' },
      xlx: { max: '1279px' },
      '2lgx': { max: '1124px' },
      lgx: { max: '1023px' },
      mdx: { max: '767px' },
      smx: { max: '639px' },
      xsx: { max: '475px' },
      '2xl': { min: '1400px' },
      xl: { min: '1280px' },
      '2lg': { min: '1124px' },
      lg: { min: '1024px' },
      md: { min: '768px' },
      sm: { min: '640px' },
      xs: { min: '475px' }
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        placeholder: 'hsl(var(--placeholder))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        gray: {
          two: 'hsl(var(--gray-two))',
          light: 'hsl(var(--gray-light))'
        },
        taiga: { DEFAULT: 'hsl(var(--taiga-light))', foreground: 'hsl(var(--taiga-dark))' },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        tabsBackground: 'hsl(var(--tabs-background))',
        tabsText: 'hsl(var(--tabs-text))'
      },
      backgroundColor: {
        taiga: { DEFAULT: 'hsl(var(--taiga-light))', foreground: 'hsl(var(--taiga-dark))' }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      transitionProperty: {
        width: 'width'
      }
    }
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
