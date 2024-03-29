import type { RestRequestConfig } from 'mock-config-server';

import { DATABASE } from './database';

export const putGithubUpdateCardConfig: RestRequestConfig = {
  path: '/github/card',
  method: 'put',
  interceptors: {
    response: (_, { request }) => {
      const { body } = request;

      DATABASE.githubCards = DATABASE.githubCards.map((card) => {
        if (card.id === body.id) {
          return {
            ...card,
            ...body
          };
        }

        return card;
      });
    }
  },
  routes: [
    {
      data: { success: true }
    }
  ]
};
