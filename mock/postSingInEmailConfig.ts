import type { RestRequestConfig } from 'mock-config-server';

export const postSingInEmailConfig: RestRequestConfig = {
  path: '/signin/email',
  method: 'post',
  interceptors: {
    response: () => {
      const needConfirmation = Math.random() > 0.5;

      if (needConfirmation) {
        return { needConfirmation };
      }
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
