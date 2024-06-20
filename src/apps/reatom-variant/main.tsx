import ReactDOM from 'react-dom/client';

import { App } from './app';
import { fetchProfile, token } from './model';
import Providers from './providers';
import { ctx } from './reatom';

export const init = async () => {
  const rootElement = document.getElementById('root')!;
  const root = ReactDOM.createRoot(rootElement);

  if (ctx.get(token)) {
    await fetchProfile(ctx);
  }

  root.render(
    <Providers>
      <App />
    </Providers>
  );
};
