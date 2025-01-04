import { api } from '../../../instance';

export interface PostSignInLoginParams {
  login: string;
  password?: string;
}
export type PostSignInLoginRequestConfig = RequestConfig<PostSignInLoginParams>;

export const postSignInLogin = ({ params, config }: PostSignInLoginRequestConfig) =>
  api.post<Confirmation | { profile: Profile; token: string }>('signin/login', params, config);
