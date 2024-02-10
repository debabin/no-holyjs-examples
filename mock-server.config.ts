import type { MockServerConfig } from 'mock-config-server';

import * as requestConfigs from './mock';

const mockServerConfig: MockServerConfig = {
  baseUrl: '/api',
  interceptors: {
    request: ({ setDelay }) => setDelay(1000)
  },
  rest: {
    configs: Object.values(requestConfigs)
  }
};

export default mockServerConfig;
