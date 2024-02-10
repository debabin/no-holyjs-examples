import { api } from '../../../instance';

export interface PostSignInLoginParams {
  login: string;
  password?: string;
}
export type PostSignInLoginConfig = RequestConfig<PostSignInLoginParams>;

export const postSignInLogin = ({ params, config }: PostSignInLoginConfig) =>
  api.post<Profile | Confirmation>('signin/login', params, config);
