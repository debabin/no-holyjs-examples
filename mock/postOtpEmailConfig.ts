import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const postOtpEmailConfig: RestRequestConfig = {
  path: '/otp/email',
  method: 'post',
  interceptors: {
    response: (_, { request, setStatusCode }) => {
      const { body } = request;

      const user = DATABASE.profiles.find((profile) => profile.email === body.email);
      if (!user) {
        setStatusCode(404);
        return { message: 'User not found' };
      }

      const otp = DATABASE.otps.find(({ source }) => body.email === source);

      if (otp && otp.endTime > Date.now()) {
        return { retryDelay: otp.endTime - Date.now() };
      }

      if (otp && otp.endTime < Date.now()) {
        DATABASE.otps = DATABASE.otps.filter(({ source }) => source !== body.email);
      }

      const retryDelay = 15_000;
      DATABASE.otps.push({
        id: Math.random(),
        source: body.email,
        value: '123456',
        endTime: Date.now() + retryDelay
      });

      return { retryDelay };
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
