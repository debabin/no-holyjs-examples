import { api } from '../../instance';

export interface PostSignInParams {
  email: string;
  password: string;
}

export const postSignIn = ({ params, config }: RequestConfig<PostSignInParams>) =>
  api.post<Profile>(`signin`, params, config);
