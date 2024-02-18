import type { RestRequestConfig } from 'mock-config-server';

let emails: { value: string; endTime: number }[] = [];

export const postOtpEmailConfig: RestRequestConfig = {
  path: '/otp/email',
  method: 'post',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;
      const email = emails.find(({ value }) => body.email === value);

      if (email && email.endTime > Date.now()) {
        return { retryDelay: email.endTime - Date.now() };
      }

      if (email && email.endTime < Date.now()) {
        emails = emails.filter(({ value }) => value !== body.email);
      }

      const retryDelay = 15_000;
      emails.push({ value: body.phone, endTime: Date.now() + retryDelay });
      return { retryDelay };
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
