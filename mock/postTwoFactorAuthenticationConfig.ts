import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils/constants';

import { DATABASE } from './database';

export const postTwoFactorAuthenticationConfig: RestRequestConfig = {
  path: '/twoFactorAuthentication',
  method: 'post',
  interceptors: {
    response: (_, { request, setStatusCode, setCookie }) => {
      const { body } = request;

      const existedOtp = DATABASE.otps.find(
        (otp) => body.source === otp.source && body.otp === otp.value
      );

      if (existedOtp) {
        DATABASE.otps = DATABASE.otps.filter((otp) => existedOtp.id !== otp.id);

        const profile = DATABASE.profiles.find(
          (profile) => profile.phone === existedOtp.source || profile.email === existedOtp.source
        )!;
        const token = profile.id.toString();
        setCookie(COOKIE.ACCESS_TOKEN, token);
        return { profile, token };
      }

      setStatusCode(404);
      return { success: false };
    }
  },
  routes: [
    {
      data: null
    }
  ]
};
