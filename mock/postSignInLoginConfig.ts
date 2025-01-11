import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

import { DATABASE } from './database';

export const postSignInLoginConfig: RestRequestConfig = {
  path: '/signin/login',
  method: 'post',
  routes: [
    {
      data: { needConfirmation: true },
      entities: {
        body: {
          login: 'siberiacancodeotp'
        }
      }
    },
    {
      data: () => {
        const profile = DATABASE.profiles.find((profile) => profile.login === 'siberiacancode')!;
        return { profile, token: profile.id.toString() };
      },
      entities: {
        body: {
          login: 'siberiacancode'
        }
      },
      interceptors: {
        response: (data, { setCookie }) => {
          const token = DATABASE.profiles
            .find((profile) => profile.login === 'siberiacancode')!
            .id.toString();
          setCookie(COOKIE.ACCESS_TOKEN, token);
          return data;
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
            return { message: 'User not found' };
          }

          const token = profile.id.toString();
          setCookie(COOKIE.ACCESS_TOKEN, token);
          return { profile, token };
        }
      }
    }
  ]
};
