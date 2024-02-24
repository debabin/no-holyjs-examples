import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

import { DATABASE } from './database';

export const getProfileConfig: RestRequestConfig = {
  path: '/profile',
  method: 'get',
  routes: [
    {
      interceptors: {
        response: (_, { request, setStatusCode }) => {
          const { cookies } = request;
          const profileId = cookies[COOKIE.ACCESS_TOKEN];

          const profile = DATABASE.profiles.find((profile) => profile.id === Number(profileId));

          if (!profile) {
            setStatusCode(404);
            return { success: false };
          }

          return { profile };
        }
      },
      data: null
    }
  ]
};
