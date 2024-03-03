import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createApiSlice } from '@/apps/redux-thunk-variant/redux/create-api';
import {
  getProfile,
  postOtpEmail,
  postOtpPhone,
  postSignInEmail,
  postSignInLogin,
  postSignUp,
  postTwoFactorAuthentication
} from '@/utils/api/requests';

const DEFAULT_ERROR = 'Something went wrong';
export const apiSlice = createApiSlice({
  name: 'api',
  endpoints: {
    getProfile,
    postOtpPhone,
    postSignInEmail,
    postSignInLogin,
    postOtpEmail,
    postSignUp,
    postTwoFactorAuthentication
  },
  onError: (cause) => {
    const { response } = cause as AxiosError;
    toast.error(response?.statusText ?? DEFAULT_ERROR, {
      cancel: { label: 'Close' }
    });
  }
});
