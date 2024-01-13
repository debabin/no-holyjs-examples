import { api } from '../../instance';

export interface PostSingUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

export const postSingUp = ({ params, config }: RequestConfig<PostSingUpParams>) =>
  api.post(`signup`, params, config);
