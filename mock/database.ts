import type { RestRequestConfig } from 'mock-config-server';

import { faker } from '@faker-js/faker';

const FIGMA_CARDS = [];

const randomIntFromInterval = () => Math.floor(Math.random() * (900 + 1));

for (let i = 0; i <= 10; i += 1) {
  FIGMA_CARDS.push({
    id: faker.number.int(),
    position: {
      x: randomIntFromInterval(),
      y: randomIntFromInterval()
    },
    size: {
      width: 300,
      height: 200
    },
    title: faker.git.branch(),
    description: faker.git.commitMessage(),
    image: faker.image.avatarGitHub(),
    reactions: {
      '👍': faker.number.int({ min: 0, max: 250 }),
      '👎': faker.number.int({ min: 0, max: 250 }),
      '🔥': faker.number.int({ min: 0, max: 250 })
    }
  });
}

export const DATABASE: { otps: Otp[]; profiles: Profile[]; githubCards: GithubCard[] } = {
  otps: [],
  profiles: [
    {
      id: 1,
      firstName: 'dima',
      avatar: 'http://localhost:31299/api/static/avatar.png',
      login: 'siberiacancode',
      email: 'siberiacancode@example.com',
      lastName: 'siberiacancode',
      password: '123456',
      role: 'admin',
      phone: '+7 123 123 1231',
      country: { id: 1, label: 'Russia', code: 'ru' }
    },
    {
      id: 2,
      firstName: 'dima',
      avatar: 'http://localhost:31299/api/static/avatar.png',
      login: 'siberiacancodeotp',
      email: 'siberiacancodeotp@example.com',
      lastName: 'siberiacancodeotp',
      password: '123456',
      role: 'admin',
      phone: '+7 123 123 1231',
      country: { id: 1, label: 'Russia', code: 'ru' }
    }
  ],
  githubCards: FIGMA_CARDS
};

export const getDatabaseConfig: RestRequestConfig = {
  path: '/database',
  method: 'get',
  routes: [
    {
      data: () => DATABASE
    }
  ]
};
