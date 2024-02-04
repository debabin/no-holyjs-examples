import type { MockServerConfig } from 'mock-config-server';

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
        method: 'get',
        path: '/data',
        routes: [
          { data: { success: true } },
          {
            data: { success: false },
            entities: {
              query: {
                name: { checkMode: 'exists' }
              }
            }
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;
