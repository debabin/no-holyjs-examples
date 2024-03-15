import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const getGithubCardConfig: RestRequestConfig = {
  path: '/github/cards',
  method: 'get',
  routes: [
    {
      data: () => ({ githubCards: DATABASE.githubCards })
    }
  ]
};
