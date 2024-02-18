import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

export const postSingInEmailConfig: RestRequestConfig = {
  path: '/signin/email',
  method: 'post',
  interceptors: {
    response: (_, { setCookie }) => {
      const needConfirmation = Math.random() > 0.5;

      if (needConfirmation) {
        return { needConfirmation };
      }

      setCookie(COOKIE.ACCESS_TOKEN, 'test');
      return { needConfirmation };
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
