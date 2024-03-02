import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers, createSlice } from '@reduxjs/toolkit';

import { store } from './store';

type ApiEndpointStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';
interface ApiEndpointState<Data> {
  data: Data | null;
  status: ApiEndpointStatus;
  error: string | null;
}

interface CreateApiSliceParams<Name, Endpoints> {
  name: Name;
  endpoints: Endpoints;
  onError?: (cause: Error) => void;
}

export const createApiSlice = <const Name, const Endpoints extends Record<string, any>>({
  name,
  endpoints,
  onError
}: CreateApiSliceParams<Name, Endpoints>) => {
  const apiSlices = Object.entries(endpoints).map(
    ([key, endpoint]: [keyof Endpoints, Endpoints[keyof Endpoints]]) => {
      const initialState: ApiEndpointState<Awaited<ReturnType<typeof endpoint>>> = {
        data: null,
        status: 'idle',
        error: null
      };

      const apiEndpointSlice = createSlice({
        name: key.toString(),
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

      const call = (async (params: any) => {
        store.dispatch(apiEndpointSlice.actions.setStatus('pending'));

        try {
          const response = await endpoint(params);
          store.dispatch(apiEndpointSlice.actions.setStatus('fulfilled'));
          store.dispatch(apiEndpointSlice.actions.setData(response));
          return response;
        } catch (error) {
          store.dispatch(apiEndpointSlice.actions.setStatus('rejected'));
          onError?.(error as Error);
          throw error;
        }
      }) as Endpoints[keyof Endpoints];

      return {
        key,
        call,
        ...apiEndpointSlice
      };
    }
  );

  const slices = apiSlices.reduce(
    (acc, slice) => {
      acc[slice.key] = slice;
      return acc;
    },
    {} as Record<keyof typeof endpoints, (typeof apiSlices)[number]>
  );

  const reducerMap = apiSlices.reduce(
    (acc, { reducer, reducerPath }) => {
      // @ts-ignore
      acc[reducerPath] = reducer;
      return acc;
    },
    {} as Record<keyof Endpoints, (typeof apiSlices)[number]['reducer']>
  );

  const apiReducer = combineReducers(reducerMap);

  return {
    endpoints: slices,
    reducer: apiReducer,
    reducerPath: name
  };
};
