import type { RestRequestConfig } from 'mock-config-server';

export const DATABASE: { otps: Otp[]; profiles: Profile[] } = {
  otps: [],
  profiles: [
    {
      id: 1,
      firstName: 'dima',
      avatar: 'http://localhost:31299/api/static/avatar.png',
      login: 'siberiacancode',
      email: 'siberiacancode@example.com',
      lastName: 'siberiacancode',
      password: '123456',
      role: 'admin',
      country: { id: 1, label: 'Russia', code: 'ru' }
    }
  ]
};

export const getDatabaseConfig: RestRequestConfig = {
  path: '/database',
  method: 'get',
  routes: [
    {
      data: () => DATABASE
    }
  ]
};
