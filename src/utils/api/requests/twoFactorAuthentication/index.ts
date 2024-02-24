import { api } from '../../instance';

export interface PostTwoFactorAuthenticationParams {
  otp: string;
  source: string;
}
export type PostTwoFactorAuthenticationRequestConfig =
  RequestConfig<PostTwoFactorAuthenticationParams>;

export const postTwoFactorAuthentication = ({
  params,
  config
}: PostTwoFactorAuthenticationRequestConfig) =>
  api.post<{ profile: Profile; token: string }>('twoFactorAuthentication', params, config);
