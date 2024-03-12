import { api } from '../../../instance';

type GetProfileRequestConfig = RequestConfig | void;

export const getFigmaCards = (params?: GetProfileRequestConfig) =>
  api.get<{ githubCards: GithubCard[] }>('figma/cards', params?.config);
