import type { RestRequestConfig } from 'mock-config-server';

let phones: { value: string; endTime: number }[] = [];

export const postOtpPhoneConfig: RestRequestConfig = {
  path: '/otp/phone',
  method: 'post',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;
      const phone = phones.find(({ value }) => body.phone === value);

      if (phone && phone.endTime > Date.now()) {
        return { retryDelay: phone.endTime - Date.now() };
      }

      if (phone && phone.endTime < Date.now()) {
        phones = phones.filter(({ value }) => value !== body.email);
      }

      const retryDelay = 15_000;
      phones.push({ value: body.phone, endTime: Date.now() + retryDelay });
      return { retryDelay };
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
