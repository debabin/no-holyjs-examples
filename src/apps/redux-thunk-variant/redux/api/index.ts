import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import {
  getProfile,
  postOtpEmail,
  postOtpPhone,
  postSignInEmail,
  postSignInLogin,
  postSignUp,
  postTwoFactorAuthentication
} from '@/utils/api';

const DEFAULT_ERROR = 'Something went wrong';
const wrapRequest =
  <Request extends (...args: any[]) => any>(request: Request) =>
  async (...args: Parameters<Request>): Promise<{ data: ReturnType<Request> }> => {
    try {
      const response = await request(...args);
      return { data: response as ReturnType<Request> };
    } catch (error) {
      const { response } = error as AxiosError;
      toast.error(response?.statusText ?? DEFAULT_ERROR, {
        cancel: { label: 'Close' }
      });
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: wrapRequest(getProfile)
    }),
    postOtpPhone: builder.mutation({
      queryFn: wrapRequest(postOtpPhone)
    }),
    postSignInEmail: builder.mutation({
      queryFn: wrapRequest(postSignInEmail)
    }),
    postSignInLogin: builder.mutation({
      queryFn: wrapRequest(postSignInLogin)
    }),
    postOtpEmail: builder.mutation({
      queryFn: wrapRequest(postOtpEmail)
    }),
    postSignUp: builder.mutation({
      queryFn: wrapRequest(postSignUp)
    }),
    postTwoFactorAuthentication: builder.mutation({
      queryFn: wrapRequest(postTwoFactorAuthentication)
    }),
    test: builder.mutation({
      queryFn: wrapRequest(postOtpEmail)
    })
  })
});
