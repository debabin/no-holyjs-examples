import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

export const postSingInEmailConfig: RestRequestConfig = {
  path: '/signin/email',
  method: 'post',
  interceptors: {
    response: (data, { setCookie }) => {
      if (data.success) {
        setCookie(COOKIE.ACCESS_TOKEN, 'test');
      }

      return data;
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
