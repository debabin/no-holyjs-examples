import type { FlatMockServerConfig } from 'mock-config-server';

import * as requestConfigs from './mock';

const mockServerConfig: FlatMockServerConfig = [
  {
    baseUrl: '/api',
    interceptors: {
      request: ({ setDelay }) => setDelay(1000)
    }
  },
  {
    name: 'colljs/auth-flow',
    configs: requestConfigs.authConfigs
  },
  {
    name: 'colljs/github-flow',
    configs: requestConfigs.githubConfigs
  }
];

export default mockServerConfig;
