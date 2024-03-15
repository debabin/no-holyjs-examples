import { api } from '../../../instance';

type GetGithubCardsRequestConfig = RequestConfig | void;

export const getGithubCards = (requestConfig?: GetGithubCardsRequestConfig) =>
  api.get<{ githubCards: GithubCard[] }>('github/cards', requestConfig?.config);
