import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const postOtpEmailConfig: RestRequestConfig = {
  path: '/otp/email',
  method: 'post',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;
      const email = DATABASE.otps.find(({ value }) => body.email === value);

      if (email && email.endTime > Date.now()) {
        return { retryDelay: email.endTime - Date.now() };
      }

      if (email && email.endTime < Date.now()) {
        DATABASE.otps = DATABASE.otps.filter(({ value }) => value !== body.email);
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
