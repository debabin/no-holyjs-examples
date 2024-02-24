import { api } from '../../../instance';

export interface PostOtpPhoneParams {
  phone: string;
}
export type PostOtpPhoneRequestConfig = RequestConfig<PostOtpPhoneParams>;

export const postOtpPhone = ({ params, config }: PostOtpPhoneRequestConfig) =>
  api.post<RetryDelay>('otp/phone', params, config);
