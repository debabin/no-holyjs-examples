import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';

import Providers from './providers.tsx';
import { routeTree } from './routeTree.gen';

import './assets/styles/globals.css';

const defaultTheme = 'dark';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(<Providers theme={{ defaultTheme }} />);
