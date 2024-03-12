import { api } from '../../../instance';

export interface PutFigmaCardParams extends Omit<Partial<GithubCard>, 'id'> {
  id: number;
}
export type PutFigmaCardParamsRequestConfig = RequestConfig<PutFigmaCardParams>;

export const putFigmaCard = ({ params, config }: PutFigmaCardParamsRequestConfig) =>
  api.put('figma/card', params, config);
