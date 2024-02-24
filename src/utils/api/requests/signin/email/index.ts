import { api } from '../../../instance';

export interface PostSignInEmailParams {
  email: string;
}
export type PostSignInEmailRequestConfig = RequestConfig<PostSignInEmailParams>;

export const postSignInEmail = ({ params, config }: PostSignInEmailRequestConfig) =>
  api.post<{ profile: Profile; token: string } | Confirmation>('signin/email', params, config);
