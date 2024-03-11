import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const getFigmaCardConfig: RestRequestConfig = {
  path: '/figma/cards',
  method: 'get',
  routes: [
    {
      data: { figmaCards: DATABASE.figmaCards }
    }
  ]
};
