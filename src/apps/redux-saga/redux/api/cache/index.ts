import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getProfile } from '@/utils/api';

export const cacheApi = createApi({
  reducerPath: 'cache',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: getProfile
    })
  })
});
