import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ApiEndpointStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';
interface ApiEndpointState<Data> {
  data: Data | null;
  status: ApiEndpointStatus;
  error: string | null;
  currentRequestId?: string;
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
        error: null,
        currentRequestId: undefined
      };

      const thunk = createAsyncThunk(
        `${name}/${key.toString()}`,
        async (...params: Parameters<typeof endpoint>) => {
          try {
            const response = await endpoint(...params);

            return response as Awaited<ReturnType<typeof endpoint>>;
          } catch (error) {
            onError?.(error as Error);
            throw error;
          }
        }
      );

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
        },
        extraReducers: (builder) => {
          builder
            .addCase(thunk.pending, (state, action) => {
              if (state.status === 'idle') {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId;
              }
            })
            .addCase(thunk.fulfilled, (state, action) => {
              const { requestId } = action.meta;
              if (state.status === 'pending' && state.currentRequestId === requestId) {
                state.status = 'idle';
                state.data = action.payload;
                state.currentRequestId = undefined;
              }
            })
            .addCase(thunk.rejected, (state, action) => {
              const { requestId } = action.meta;
              if (state.status === 'pending' && state.currentRequestId === requestId) {
                state.status = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
              }
            });
        }
      });

      return {
        key,
        thunk,
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
