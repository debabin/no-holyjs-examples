import { api } from '../../instance';

type GetProfileRequestConfig = RequestConfig | void;

export const getProfile = (params?: GetProfileRequestConfig) =>
  api.get<{ profile: Profile }>('profile', params?.config);
