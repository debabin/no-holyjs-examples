import { api } from '../../../instance';

export interface PostSignInEmailParams {
  email: string;
}
export type PostSignInEmailConfig = RequestConfig<PostSignInEmailParams>;

export const postSignInEmail = ({ params, config }: PostSignInEmailConfig) =>
  api.post<Profile | Confirmation>('signin/email', params, config);
