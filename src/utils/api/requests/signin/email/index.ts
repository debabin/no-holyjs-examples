import { api } from '../../../instance';

export interface PostSignInEmailParams {
  email: string;
}
export type PostSignInEmailRequestConfig = RequestConfig<PostSignInEmailParams>;

export const postSignInEmail = ({ params, config }: PostSignInEmailRequestConfig) =>
  api.post<Confirmation | { profile: Profile; token: string }>('signin/email', params, config);
