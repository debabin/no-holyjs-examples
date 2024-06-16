import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const postOtpPhoneConfig: RestRequestConfig = {
  path: '/otp/phone',
  method: 'post',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;
      const otp = DATABASE.otps.find(({ source }) => body.phone === source);

      if (otp && otp.endTime > Date.now()) {
        return { retryDelay: otp.endTime - Date.now() };
      }

      if (otp && otp.endTime < Date.now()) {
        DATABASE.otps = DATABASE.otps.filter(({ source }) => source !== body.email);
      }

      const retryDelay = 15_000;
      DATABASE.otps.push({
        id: Math.random(),
        source: body.phone,
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
