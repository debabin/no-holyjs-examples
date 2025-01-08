import type { AxiosError } from 'axios';

import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ReactHooksProviders from '@/apps/react-hooks-variant/providers';
import ReatomProviders from '@/apps/reatom-variant/providers';
import ReduxSagaProviders from '@/apps/redux-saga-variant/providers';
import ReduxThunkProviders from '@/apps/redux-thunk-variant/providers';

import '@/assets/styles/globals.css';
import {
  createRootRoute,
  Outlet,
  createRoute,
  createRouter,
  RouterProvider
} from '@tanstack/react-router';

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

const withRouter = (component: any) => {
  const rootRoute = createRootRoute({
    component: Outlet
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component
  });

  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = createRouter({ routeTree });

  // this is rtl's render
  return <RouterProvider router={router} />;
};

const ReactHooksWrapper = ({ children }: { children: React.ReactNode }) => (
  <ReactHooksProviders
    query={{
      client: queryClient
    }}
    theme={{
      defaultTheme: 'light'
    }}
    profile={{
      defaultProfile: undefined
    }}
    session={{
      defaultSession: false
    }}
  >
    {children}
  </ReactHooksProviders>
);

const ReatomWrapper = ({ children }: { children: React.ReactNode }) => (
  <ReatomProviders>{children}</ReatomProviders>
);

const ReduxSagaWrapper = ({ children }: { children: React.ReactNode }) => (
  <ReduxSagaProviders>{children}</ReduxSagaProviders>
);

const ReduxThunkWrapper = ({ children }: { children: React.ReactNode }) => (
  <ReduxThunkProviders>{children}</ReduxThunkProviders>
);

// eslint-disable-next-line @typescript-eslint/require-await
beforeMount(async ({ App }) =>
  withRouter(() => (
    <ReduxThunkWrapper>
      <ReduxSagaWrapper>
        <ReactHooksWrapper>
          <ReatomWrapper>
            <App />
          </ReatomWrapper>
        </ReactHooksWrapper>
      </ReduxSagaWrapper>
    </ReduxThunkWrapper>
  ))
);
