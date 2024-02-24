import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const postSignUpConfig: RestRequestConfig = {
  path: '/signup',
  method: 'post',
  interceptors: {
    response: (_, { request, setStatusCode }) => {
      const { body } = request;

      DATABASE.profiles.push({
        ...body,
        id: Math.random(),
        avatar: 'http://localhost:31299/api/static/avatar.png',
        role: 'user'
      });
      setStatusCode(201);
    }
  },
  routes: [
    {
      data: null
    }
  ]
};
