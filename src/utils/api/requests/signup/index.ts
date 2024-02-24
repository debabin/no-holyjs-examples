import { api } from '../../instance';

export type PostSignUpParams = {
  email: string;
  login: string;
  password: string;
  firstName?: string;
  lastName?: string;
  country: {
    id: number;
    label: string;
    code: string;
  };
};

export type PostSignUpRequestConfig = RequestConfig<PostSignUpParams>;

export const postSignUp = ({ params, config }: PostSignUpRequestConfig) =>
  api.post('signup', params, config);
