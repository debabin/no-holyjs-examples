import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { ThemeProviderProps } from '@/utils/contexts';
import { ThemeProvider } from '@/utils/contexts';

import { routeTree } from './routeTree.gen';

interface ProvidersProps {
  children: React.ReactNode;
  theme: Omit<ThemeProviderProps, 'children'>;
}

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

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

const Providers: React.FC<ProvidersProps> = ({ theme }) => (
  <ThemeProvider {...theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);

export default Providers;
