import { api } from '../../../instance';

export interface PostOtpEmailParams {
  email: string;
}
export type PostOtpEmailConfig = RequestConfig<PostOtpEmailParams>;

export const postOtpEmail = ({ params, config }: PostOtpEmailConfig) =>
  api.post<RetryDelay>('otp/email', params, config);
