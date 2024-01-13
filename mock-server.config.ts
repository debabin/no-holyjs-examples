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

const sessions = [] as { id: string; userId: number }[];
const database = {
  users: [] as Profile[]
};

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
                const user = database.users.find(
                  (user) =>
                    user.email === request.body.email && user.password === request.body.password
                );

                if (!user) {
                  setStatusCode(404);
                  return { success: false, message: 'User not found' };
                }

                const sessionId = generateToken();
                setCookie(COOKIE.SESSION_ID, sessionId, {
                  httpOnly: true,
                  maxAge: 360000,
                  path: '/'
                });
                sessions.push({ id: sessionId, userId: user.id });

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
                const sessionId = getCookie(COOKIE.SESSION_ID);

                const session = sessions.find((session) => session.id === sessionId);

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
      }
    ]
  }
};

export default mockServerConfig;
