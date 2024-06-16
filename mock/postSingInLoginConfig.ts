import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

import { DATABASE } from './database';

export const postSingInLoginConfig: RestRequestConfig = {
  path: '/signin/login',
  method: 'post',
  routes: [
    {
      data: { needConfirmation: true },
      entities: {
        body: {
          login: 'asd'
        }
      }
    },
    {
      data: { needConfirmation: false },
      entities: {
        body: {
          login: 'asd2'
        }
      }
    },
    {
      data: null,
      interceptors: {
        response: (_, { setCookie, request, setStatusCode }) => {
          const needConfirmation = Math.random() > 0.5;

          if (needConfirmation) {
            return { needConfirmation };
          }

          const { body } = request;
          const profile = DATABASE.profiles.find(
            (profile) => profile.login === body.login && profile.password === body.password
          );
          if (!profile) {
            setStatusCode(404);
            return { success: false };
          }

          const token = profile.id.toString();
          setCookie(COOKIE.ACCESS_TOKEN, token);
          return { profile, token };
        }
      }
    }
  ]
};
