import type { Draft, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { combineSlices, createSlice } from '@reduxjs/toolkit';

import { store } from './store';

type ApiEndpointStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';
interface ApiEndpointState<Data> {
  data: Data | null;
  status: ApiEndpointStatus;
  error: string | null;
}

interface CreateApiParams<Name extends string, EndpointsDefinitions extends Record<string, any>> {
  name: Name;
  endpoints: (builder: Builder) => EndpointsDefinitions;
  onError?: (cause: Error) => void;
}

interface Builder {
  mutation: <Request extends (...args: any[]) => any>(
    request: Request
  ) => { initiate: (...params: Parameters<Request>) => ReturnType<Request> } & Omit<
    ReturnType<typeof createEndpointSlice>,
    'initiate'
  >;
  query: <Request extends (...args: any[]) => any>(
    request: Request
  ) => { initiate: (...params: Parameters<Request>) => ReturnType<Request> } & Omit<
    ReturnType<typeof createEndpointSlice>,
    'initiate'
  >;
}

const createEndpointSlice = <const E extends (...args: any) => any>(endpoint: E) => {
  const initialState: ApiEndpointState<Awaited<ReturnType<E>>> = {
    data: null,
    status: 'idle',
    error: null
  };

  const apiEndpointSlice = createSlice({
    name: endpoint.name.toString(),
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

  const initiate = (...params: Parameters<E>) => {
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
  };

  return { ...apiEndpointSlice, initiate };
};

export const createApi = <
  const Name extends string,
  EndpointsDefinitions extends Record<string, any>
>({
  name,
  endpoints
}: CreateApiParams<Name, EndpointsDefinitions>): {
  endpoints: EndpointsDefinitions;
  name: Name;
  reducer: Reducer;
} => {
  const builder: Builder = {
    mutation: <Request extends (...args: any[]) => any>(request: Request) =>
      createEndpointSlice<Request>(request),
    query: <Request extends (...args: any[]) => any>(request: Request) =>
      createEndpointSlice<Request>(request)
  };

  const endpointsDefinitions = endpoints(builder);

  const apiReducer = combineSlices(...Object.values(endpointsDefinitions));

  return { endpoints: endpointsDefinitions, name, reducer: apiReducer };
};
