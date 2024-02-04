import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

import Providers from './providers.tsx';

import './assets/styles/globals.css';

const TOASTER_DURATION = 5000;
const defaultTheme = 'dark';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers theme={{ defaultTheme }}>
    <Toaster duration={TOASTER_DURATION} />
  </Providers>
);
