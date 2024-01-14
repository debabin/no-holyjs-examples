import type { NextRequest } from 'next/server';

import { COOKIE } from '@/utils/constants';

const apiServer = 'http://localhost:31299/api';

async function proxy(req: NextRequest, ctx: { params: { proxy: string[] } }) {
  let url = `${apiServer}/${ctx.params.proxy.join('/')}`;
  const search = req.nextUrl.searchParams.toString();
  if (search) {
    url += `?${search}`;
  }

  const headers = new Headers();
  req.headers.forEach((v, k) => {
    headers.append(k, v);
  });

  const accessToken = req.cookies.get(COOKIE.SESSION_ID);
  console.log('@accessToken', accessToken);
  if (accessToken) {
    console.log('@', accessToken);
    headers.set('Authorization', `Bearer ${req.cookies.get(COOKIE.SESSION_ID)?.value}`);
  }

  console.log('@req.body', req.body);

  const res = await fetch(url, {
    method: req.method,
    headers,
    ...(req.body && { body: JSON.stringify(await req.json()) })
  });
  console.log('@', res);
  return res;
}

export { proxy as DELETE, proxy as GET, proxy as POST, proxy as PUT };
