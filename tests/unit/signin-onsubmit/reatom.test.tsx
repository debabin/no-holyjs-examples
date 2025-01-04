import { otpAtom, signInSubmit, stageAtom } from '@reatom-variant/pages/auth/model';
import { createCtx } from '@reatom/framework';
import { startRestMockServer } from 'mock-config-server';

import { fetchProfile, sessionAtom, tokenAtom } from '@/apps/reatom-variant/model';
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

it('Should sign in for email', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, { resource: 'email', values: { login: 'siberiacancode@example.com' } });

  const stage = ctx.get(stageAtom);
  const otp = ctx.get(otpAtom);
  expect(stage.value).toBe('confirmation');
  expect(otp).toEqual({
    type: 'email',
    resource: 'siberiacancode@example.com',
    retryDelay: 120_000
  });
});

it('Should doesnt sign in for email when "/otp/email" error', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, { resource: 'email', values: { login: 'error@example.com' } });

  const stage = ctx.get(stageAtom);
  const otp = ctx.get(otpAtom);
  expect(stage.value).toBe('signIn');
  expect(otp).toEqual({
    type: 'email',
    resource: '',
    retryDelay: 0
  });
});

it('Should sign in for login when need confirmation', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'needconfirmation', password: 'siberiacancode' }
  });

  const stage = ctx.get(stageAtom);

  expect(stage.value).toBe('selectConfirmation');
});

it('Should sign in for login when dont need confirmation', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'dontneedconfirmation', password: 'siberiacancode' }
  });

  const token = ctx.get(tokenAtom);
  const session = ctx.get(sessionAtom);
  const profileAtom = ctx.get(fetchProfile.dataAtom);

  expect(session.isAuthenticated).toBe(true);
  expect(token).toBe('siberiacancode');
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

it('Should doesnt sign in for login when "/signin/login" error', async () => {
  const ctx = createCtx();

  await signInSubmit(ctx, {
    resource: 'login',
    values: { login: 'error', password: 'siberiacancode' }
  });

  const token = ctx.get(tokenAtom);
  const session = ctx.get(sessionAtom);

  expect(session.isAuthenticated).toBe(false);
  expect(token).toBe(null);
});
