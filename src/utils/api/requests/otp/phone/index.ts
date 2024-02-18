import { api } from '../../../instance';

export interface PostOtpPhoneParams {
  phone: string;
}
export type PostOtpPhoneConfig = RequestConfig<PostOtpPhoneParams>;

export const postOtpPhone = ({ params, config }: PostOtpPhoneConfig) =>
  api.post<RetryDelay>('otp/phone', params, config);
