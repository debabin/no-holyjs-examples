import { api } from '../../../instance';

export interface PostOtpEmailParams {
  email: string;
}
export type PostOtpEmailRequestConfig = RequestConfig<PostOtpEmailParams>;

export const postOtpEmail = ({ params, config }: PostOtpEmailRequestConfig) =>
  api.post<RetryDelay>('otp/email', params, config);
