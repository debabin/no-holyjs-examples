import { createCtx } from '@reatom/framework';
import { otp, signInSubmit, stage } from '@reatom-variant/pages/auth/model';
import { startRestMockServer } from 'mock-config-server';

import { fetchProfile, session, token } from '@/apps/reatom-variant/model';
import { router } from '@/apps/reatom-variant/router';
import { ROUTES } from '@/utils';

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
  const ctx = createCtx();

  await signInSubmit(ctx, { resource: 'email', values: { login: 'siberiacancode@example.com' } });

  const stageAtom = ctx.get(stage);
  const otpAtom = ctx.get(otp);
  expect(stageAtom.value).toBe('confirmation');
  expect(otpAtom).toEqual({
    type: 'email',
    resource: 'siberiacancode@example.com',
    retryDelay: 120_000
  });
});

test('Should doesnt sign in for email when "/otp/email" error', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, { resource: 'email', values: { login: 'error@example.com' } });

  const stageAtom = ctx.get(stage);
  const otpAtom = ctx.get(otp);
  expect(stageAtom.value).toBe('signIn');
  expect(otpAtom).toEqual({
    type: 'email',
    resource: '',
    retryDelay: 0
  });
});

test('Should sign in for login when need confirmation', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'needconfirmation', password: 'siberiacancode' }
  });

  const stageAtom = ctx.get(stage);

  expect(stageAtom.value).toBe('selectConfirmation');
});

test('Should sign in for login when dont need confirmation', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'dontneedconfirmation', password: 'siberiacancode' }
  });

  const tokenAtom = ctx.get(token);
  const sessionAtom = ctx.get(session);
  const profileAtom = ctx.get(fetchProfile.dataAtom);

  expect(sessionAtom.isAuthenticated).toBe(true);
  expect(tokenAtom).toBe('siberiacancode');
  expect(profileAtom).toEqual({
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
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'error', password: 'siberiacancode' }
  });

  const tokenAtom = ctx.get(token);
  const sessionAtom = ctx.get(session);

  expect(sessionAtom.isAuthenticated).toBe(false);
  expect(tokenAtom).toBe(null);
});
