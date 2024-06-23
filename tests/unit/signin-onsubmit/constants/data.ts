export const POST_OTP_EMAIL_RESPONSE = {
  retryDelay: 120_000
} satisfies RetryDelay;

export const POST_SIGNIN_LOGIN_RESPONSE = {
  DONT_NEED_CONFIRMATION: {
    profile: {
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
    },
    token: 'siberiacancode'
  },
  NEED_CONFIRMATION: {
    needConfirmation: true
  }
} satisfies Record<string, { profile: Profile; token: string } | Confirmation>;
