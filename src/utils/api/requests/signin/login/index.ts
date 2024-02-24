import { api } from '../../../instance';

export interface PostSignInLoginParams {
  login: string;
  password?: string;
}
export type PostSignInLoginRequestConfig = RequestConfig<PostSignInLoginParams>;

export const postSignInLogin = ({ params, config }: PostSignInLoginRequestConfig) =>
  api.post<{ profile: Profile; token: string } | Confirmation>('signin/login', params, config);
