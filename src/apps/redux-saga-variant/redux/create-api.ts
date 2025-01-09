import type { Draft, PayloadAction, Reducer } from '@reduxjs/toolkit';

import { combineSlices, createSlice } from '@reduxjs/toolkit';

import { store } from './store';

type ApiEndpointStatus = 'fulfilled' | 'idle' | 'pending' | 'rejected';
interface ApiEndpointState<Data> {
  data: Data | null;
  error: string | null;
  status: ApiEndpointStatus;
}

interface CreateApiParams<Name extends string, EndpointsDefinitions extends Record<string, any>> {
  name: Name;
  endpoints: (builder: Builder) => EndpointsDefinitions;
  onError?: (cause: Error) => void;
}

interface Builder {
  mutation: <Request extends (...args: any[]) => any>(
    name: string,
    request: Request
  ) => { initiate: Request } & Omit<ReturnType<typeof createEndpointSlice>, 'initiate'>;
  query: <Request extends (...args: any[]) => any>(
    name: string,
    request: Request
  ) => { initiate: Request } & Omit<ReturnType<typeof createEndpointSlice>, 'initiate'>;
}

const createEndpointSlice = <const E extends (...args: any) => any>(name: string, endpoint: E) => {
  const initialState: ApiEndpointState<Awaited<ReturnType<E>>> = {
    data: null,
    status: 'idle',
    error: null
  };

  const apiEndpointSlice = createSlice({
    name,
    initialState,
    reducers: {
      setStatus: (state, action: PayloadAction<ApiEndpointStatus>) => {
        state.status = action.payload;
      },
      setData: (state, action: PayloadAction<Draft<Awaited<ReturnType<typeof endpoint>>>>) => {
        state.data = action.payload;
      }
    }
  });

  const initiate = ((params: Parameters<E>) => {
    store.dispatch(apiEndpointSlice.actions.setStatus('pending'));

    const response = endpoint(params)
      .catch((error: any) => {
        store.dispatch(apiEndpointSlice.actions.setStatus('rejected'));
        throw error;
      })
      .finally(() => {
        store.dispatch(apiEndpointSlice.actions.setStatus('fulfilled'));
        store.dispatch(apiEndpointSlice.actions.setData(response));
      });

    return response as Awaited<ReturnType<E>>;
  }) as E;

  return { ...apiEndpointSlice, initiate };
};

const builder: Builder = {
  mutation: <Request extends (...args: any[]) => any>(name: string, request: Request) =>
    createEndpointSlice<Request>(name, request),
  query: <Request extends (...args: any[]) => any>(name: string, request: Request) =>
    createEndpointSlice<Request>(name, request)
};

export const createApi = <
  const Name extends string,
  EndpointsDefinitions extends Record<string, any>
>({
  name,
  endpoints
}: CreateApiParams<Name, EndpointsDefinitions>) => {
  const endpointsDefinitions = endpoints(builder);

  const reducer = combineSlices(...Object.values(endpointsDefinitions));

  return { endpoints: endpointsDefinitions, name, reducer } as {
    endpoints: EndpointsDefinitions;
    name: Name;
    reducer: Reducer<
      Record<
        keyof EndpointsDefinitions,
        ApiEndpointState<
          Awaited<ReturnType<EndpointsDefinitions[keyof EndpointsDefinitions]['initiate']>>
        >
      >
    >;
  };
};
