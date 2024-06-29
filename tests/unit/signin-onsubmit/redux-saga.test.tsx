import { startRestMockServer } from 'mock-config-server';
import { call, put } from 'redux-saga/effects';

import { onSignInSubmit } from '@/apps/redux-saga-variant/pages/auth/sagas/onSingInSubmit';
import { authActions, authPrefix, authReducer } from '@/apps/redux-saga-variant/pages/auth/slices';
import { otpCountdownSlice } from '@/apps/redux-saga-variant/pages/auth/slices/otpCountdown/slice';
import { apiSlice } from '@/apps/redux-saga-variant/redux/api';
import { createStore } from '@/apps/redux-saga-variant/redux/store';

import { POST_OTP_EMAIL_RESPONSE, POST_SIGNIN_LOGIN_RESPONSE } from './constants/data';

let server: ReturnType<typeof startRestMockServer>;
beforeAll(() => {
  server = startRestMockServer({
    port: 3000,
    baseUrl: '/api',
    configs: [
      {
        method: 'post',
        path: '/otp/email',
        routes: [
          {
            data: POST_OTP_EMAIL_RESPONSE,
            interceptors: {
              request: () => {
                console.log('@@@@@@@@@@@@@@@request');
              }
            }
          },
          {
            entities: { body: { email: 'error@example.com' } },
            data: null,
            settings: { status: 500 }
          }
        ]
      },
      {
        method: 'post',
        path: '/signin/login',
        routes: [
          {
            entities: { body: { login: 'error' } },
            data: null,
            settings: { status: 500 }
          },
          {
            entities: { body: { login: 'dontneedconfirmation' } },
            data: POST_SIGNIN_LOGIN_RESPONSE.DONT_NEED_CONFIRMATION
          },
          {
            entities: { body: { login: 'needconfirmation' } },
            data: POST_SIGNIN_LOGIN_RESPONSE.NEED_CONFIRMATION
          }
        ]
      }
    ]
  });
});
afterEach(() => localStorage.clear());
afterAll(() => {
  server.destroy();
});

test('Should sign in for email', async () => {
  const store = createStore();
  store.rootReducer.inject({
    reducerPath: authPrefix,
    reducer: authReducer
  });
  store.dispatch({ type: '@@INIT' });
  const saga = onSignInSubmit.saga({
    type: onSignInSubmit.action.type,
    payload: {
      resource: 'email',
      values: { login: 'siberiacancode@example.com' }
    }
  });
  expect(saga.next().value).toEqual(
    call(apiSlice.endpoints.postOtpEmail.initiate, {
      params: { email: 'siberiacancode@example.com' }
    })
  );

  saga.next({
    data: {
      type: 'email',
      resource: 'siberiacancode@example.com',
      retryDelay: 120_000
    }
  } as any).value;

  expect(saga.next().value).toEqual(call(otpCountdownSlice.startCountdown, 120));
  expect(saga.next().value).toEqual(put(authActions.setStage('confirmation')));
});
