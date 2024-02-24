import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const postOtpPhoneConfig: RestRequestConfig = {
  path: '/otp/phone',
  method: 'post',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;
      const phone = DATABASE.otps.find(({ value }) => body.phone === value);

      if (phone && phone.endTime > Date.now()) {
        return { retryDelay: phone.endTime - Date.now() };
      }

      if (phone && phone.endTime < Date.now()) {
        DATABASE.otps = DATABASE.otps.filter(({ value }) => value !== body.email);
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
