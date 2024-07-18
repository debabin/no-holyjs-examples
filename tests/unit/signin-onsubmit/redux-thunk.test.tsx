import { startRestMockServer } from 'mock-config-server';

import { authPrefix, authReducer } from '@/apps/redux-thunk-variant/pages/auth/slices';
import { onSignInSubmit } from '@/apps/redux-thunk-variant/pages/auth/thunks/onSingInSubmit';
import { createStore } from '@/apps/redux-thunk-variant/redux/store';
import { router } from '@/apps/redux-thunk-variant/router';
import { COOKIE, ROUTES } from '@/utils';

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
          { data: POST_OTP_EMAIL_RESPONSE },
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

  await store.dispatch(
    onSignInSubmit.thunk({
      resource: 'email',
      values: { login: 'siberiacancode@example.com' }
    })
  );

  const { stage } = store.getState().auth!;
  const { otp } = store.getState().auth!;
  expect(stage.value).toBe('confirmation');
  expect(otp).toEqual({
    type: 'email',
    resource: 'siberiacancode@example.com',
    retryDelay: 120_000
  });
});

test('Should doesnt sign in for email when "/otp/email" error', async () => {
  const store = createStore();
  store.rootReducer.inject({
    reducerPath: authPrefix,
    reducer: authReducer
  });
  store.dispatch({ type: '@@INIT' });

  await store.dispatch(
    onSignInSubmit.thunk({ resource: 'email', values: { login: 'error@example.com' } })
  );

  const { stage } = store.getState().auth!;
  const { otp } = store.getState().auth!;
  expect(stage.value).toBe('signIn');
  expect(otp).toEqual({
    type: 'email',
    resource: '',
    retryDelay: 0
  });
});

test('Should sign in for login when need confirmation', async () => {
  const store = createStore();
  store.rootReducer.inject({
    reducerPath: authPrefix,
    reducer: authReducer
  });
  store.dispatch({ type: '@@INIT' });

  await store.dispatch(
    onSignInSubmit.thunk({
      resource: 'login',
      values: { login: 'needconfirmation', password: 'siberiacancode' }
    })
  );

  const { stage } = store.getState().auth!;
  expect(stage.value).toBe('selectConfirmation');
});

test('Should sign in for login when dont need confirmation', async () => {
  const store = createStore();
  store.rootReducer.inject({
    reducerPath: authPrefix,
    reducer: authReducer
  });
  store.dispatch({ type: '@@INIT' });

  await store.dispatch(
    onSignInSubmit.thunk({
      resource: 'login',
      values: { login: 'dontneedconfirmation', password: 'siberiacancode' }
    })
  );

  const { session } = store.getState();
  const { profile } = store.getState();
  expect(localStorage.getItem(COOKIE.ACCESS_TOKEN)).toBe('siberiacancode');
  expect(session.isAuthenticated).toBe(true);
  expect(profile.value).toEqual({
    id: 1,
    firstName: 'dima',
    avatar: 'http://localhost:31299/api/static/avatar.png',
    login: 'siberiacancode',
    email: 'siberiacancode@example.com',
    lastName: 'siberiacancode',
    password: '123456',
    role: 'admin',
    phone: '+7 123 123 1231',
    country: { id: 1, label: 'Russia', code: 'ru' }
  });
  expect(router.state.location.pathname).toBe(ROUTES.INDEX);
});

test('Should doesnt sign in for login when "/signin/login" error', async () => {
  const store = createStore();
  store.rootReducer.inject({
    reducerPath: authPrefix,
    reducer: authReducer
  });
  store.dispatch({ type: '@@INIT' });

  await store.dispatch(
    onSignInSubmit.thunk({
      resource: 'login',
      values: { login: 'error', password: 'siberiacancode' }
    })
  );

  const { session } = store.getState();

  expect(session.isAuthenticated).toBe(false);
  expect(localStorage.getItem(COOKIE.ACCESS_TOKEN)).toBe(null);
});
