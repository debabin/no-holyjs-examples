import type { AxiosError } from 'axios';

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import ReactHooksProviders from '@/apps/react-hooks-variant/providers';
import ReatomProviders from '@/apps/reatom-variant/providers';
import ReduxSagaProviders from '@/apps/redux-saga-variant/providers';
import ReduxThunkProviders from '@/apps/redux-thunk-variant/providers';

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

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ReduxThunkWrapper>
    <ReduxSagaWrapper>
      <ReactHooksWrapper>
        <ReatomWrapper>{children}</ReatomWrapper>
      </ReactHooksWrapper>
    </ReduxSagaWrapper>
  </ReduxThunkWrapper>
);
