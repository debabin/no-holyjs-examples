import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createApi } from '@/apps/redux-saga-variant/redux/create-api';
import {
  getGithubCards,
  getProfile,
  postOtpEmail,
  postOtpPhone,
  postSignInEmail,
  postSignInLogin,
  postSignUp,
  postTwoFactorAuthentication,
  putGithubCard
} from '@/utils/api/requests';

const DEFAULT_ERROR = 'Something went wrong';
export const apiSlice = createApi({
  name: 'api',
  endpoints: (builder) => ({
    putGithubCard: builder.mutation(putGithubCard),
    getGithubCards: builder.mutation(getGithubCards),
    postOtpEmail: builder.mutation(postOtpEmail),
    getProfile: builder.mutation(getProfile),
    postOtpPhone: builder.mutation(postOtpPhone),
    postSignInEmail: builder.mutation(postSignInEmail),
    postSignInLogin: builder.mutation(postSignInLogin),
    postSignUp: builder.mutation(postSignUp),
    postTwoFactorAuthentication: builder.mutation(postTwoFactorAuthentication)
  }),
  onError: (cause) => {
    const { response } = cause as AxiosError;
    toast.error(response?.statusText ?? DEFAULT_ERROR, {
      cancel: { label: 'Close' }
    });
  }
});
