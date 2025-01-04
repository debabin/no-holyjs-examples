import { api } from '../../instance';

export interface PostSignUpParams {
  email: string;
  firstName?: string;
  lastName?: string;
  login: string;
  password: string;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

export type PostSignUpRequestConfig = RequestConfig<PostSignUpParams>;

export const postSignUp = ({ params, config }: PostSignUpRequestConfig) =>
  api.post('signup', params, config);
