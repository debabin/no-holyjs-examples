import type { MockServerConfig } from 'mock-config-server';

import { COOKIE } from '@/utils';

const generateToken = () => {
  let sessionId = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    sessionId += Math.floor(Math.random() * 10);
  }
  return sessionId;
};

const database = {
  users: [
    {
      id: 0,
      role: 'user',
      email: 'dima@gmail.com',
      password: '123123',
      firstName: '123',
      lastName: '123'
    }
  ] as Profile[],
  sessions: [] as { id: string; userId: number }[],
  refreshTokens: [] as { id: string; userId: number }[]
};

// Function to generate a refresh token

const mockServerConfig: MockServerConfig = {
  baseUrl: '/api',
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['content-type'],
    credentials: true
  },
  interceptors: {
    request: ({ setDelay }) => setDelay(1000)
  },
  rest: {
    configs: [
      {
        method: 'post',
        path: '/signup',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (data, { request, setStatusCode }) => {
                const { email } = request.body;
                const user = database.users.find((user) => user.email === email);

                if (user) {
                  setStatusCode(401);
                  return { success: false, message: 'Email is already in use' };
                }

                database.users.push({ id: database.users.length, role: 'user', ...request.body });
                return data;
              }
            }
          }
        ]
      },
      {
        method: 'post',
        path: '/signin',
        routes: [
          {
            data: null,
            interceptors: {
              response: (_, { request, setCookie, setStatusCode }) => {
                // const needConfirmation = Math.round(Math.random());
                // if (needConfirmation) {
                //   return { needConfirmation: true };
                // }

                const user = database.users.find(
                  (user) =>
                    user.email === request.body.email && user.password === request.body.password
                );

                if (!user) {
                  setStatusCode(404);
                  return { success: false, message: 'User not found' };
                }

                const sessionId = generateToken();
                database.sessions.push({ id: sessionId, userId: user.id });
                setCookie(COOKIE.SESSION_ID, sessionId, {
                  httpOnly: true,
                  maxAge: 360000,
                  path: '/'
                });

                return user;
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/profile',
        routes: [
          {
            data: null,
            interceptors: {
              response: (_, { setStatusCode, getCookie }) => {
                // session
                const sessionId = getCookie(COOKIE.SESSION_ID);
                const session = database.sessions.find((session) => session.id === sessionId);
                if (!session) {
                  setStatusCode(401);
                  return { success: false, message: 'Session not found' };
                }

                const user = database.users.find((user) => user.id === session.userId);

                if (!user) {
                  setStatusCode(404);
                  return { success: false, message: 'User not found' };
                }

                return user;
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/logout',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (data, { getCookie, setStatusCode, setCookie }) => {
                const sessionId = getCookie(COOKIE.SESSION_ID);
                const session = database.sessions.find((session) => session.id === sessionId);
                if (!session) {
                  setStatusCode(401);
                  return { success: false, message: 'Session not found' };
                }
                database.sessions = database.sessions.filter((session) => session.id !== sessionId);
                setCookie(COOKIE.SESSION_ID, '', {
                  httpOnly: true,
                  maxAge: 0,
                  path: '/'
                });
                return data;
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/database',
        routes: [
          {
            data: () => database
          }
        ]
      },
      {
        method: 'delete',
        path: '/session/:id',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (data, { request, setStatusCode, setCookie }) => {
                const sessionId = request.params.id;
                const session = database.sessions.find((session) => session.id === sessionId);
                if (!session) {
                  setStatusCode(401);
                  return { success: false, message: 'Session not found' };
                }
                database.sessions = database.sessions.filter((session) => session.id !== sessionId);
                setCookie(COOKIE.SESSION_ID, '', {
                  httpOnly: true,
                  maxAge: 0,
                  path: '/'
                });
                return data;
              }
            }
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;
