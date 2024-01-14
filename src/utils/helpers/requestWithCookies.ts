import type { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

import { COOKIE } from '../constants';

export const requestWithCookies = (
  cb: (params?: RequestConfig) => Promise<AxiosResponse<any, any>>
) => {
  const sessionIdCookie = cookies().get(COOKIE.SESSION_ID);

  return cb({
    config: {
      headers: {
        ...(sessionIdCookie && { cookie: `${COOKIE.SESSION_ID}=${sessionIdCookie?.value};` })
      }
    }
  });
};
