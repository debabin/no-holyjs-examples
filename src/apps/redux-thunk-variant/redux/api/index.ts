import type { AxiosError } from 'axios';

import { toast } from 'sonner';

import { createApi } from '@/apps/redux-thunk-variant/redux/create-api';
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
    'putGithubCard': builder.mutation('putGithubCard', putGithubCard),
    'getGithubCards': builder.mutation('getGithubCards', getGithubCards),
    'postOtpEmail': builder.mutation('postOtpEmail', postOtpEmail),
    'getProfile': builder.mutation('getProfile', getProfile),
    'postOtpPhone': builder.mutation('postOtpPhone', postOtpPhone),
    'postSignInEmail': builder.mutation('postSignInEmail', postSignInEmail),
    'postSignInLogin': builder.mutation('postSignInLogin', postSignInLogin),
    'postSignUp': builder.mutation('postSignUp', postSignUp),
    'postTwoFactorAuthentication': builder.mutation('postTwoFactorAuthentication', postTwoFactorAuthentication)
  }),
  onError: (cause) => {
    const { response } = cause as AxiosError;
    toast.error(response?.statusText ?? DEFAULT_ERROR, {
      cancel: { label: 'Close' }
    });
  }
});
