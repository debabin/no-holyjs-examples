import { api } from '../../../instance';

export interface PutGithubCardParams extends Omit<Partial<GithubCard>, 'id'> {
  id: number;
}
export type PutGithubCardRequestConfig = RequestConfig<PutGithubCardParams>;

export const putGithubCard = ({ params, config }: PutGithubCardRequestConfig) =>
  api.put('github/card', params, config);
