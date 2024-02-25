import ReactDOM from 'react-dom/client';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { COOKIE } from '@/utils';
import { getProfile } from '@/utils/api';

import { App } from './app.tsx';
import type { ProvidersProps } from './providers.tsx';
import Providers from './providers.tsx';

const defaultTheme = 'light';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

const DEFAULT_ERROR = 'Something went wrong';
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (cause) => {
      const { response } = cause as AxiosError<BaseResponse>;
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        cancel: { label: 'Close' }
      });
    }
  }),
  mutationCache: new MutationCache({
    onError: (cause) => {
      const { response } = cause as AxiosError<BaseResponse>;
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        cancel: { label: 'Close' }
      });
    }
  })
});

const init = async () => {
  const token = localStorage.getItem(COOKIE.ACCESS_TOKEN);

  const providersProps: Omit<ProvidersProps, 'children'> = {
    theme: { defaultTheme },
    session: { defaultSession: false },
    query: { client: queryClient },
    profile: { defaultProfile: undefined }
  };

  if (token) {
    const getProfileQuery = await queryClient.fetchQuery({
      queryKey: ['getProfile'],
      queryFn: () => getProfile()
    });

    providersProps.profile.defaultProfile = getProfileQuery.data.profile;
    providersProps.session.defaultSession = !!getProfileQuery.data;
  }

  root.render(
    <Providers {...providersProps}>
      <App />
    </Providers>
  );
};

init();
