import { api } from '../../instance';

export const getProfile = (params?: RequestConfig) =>
  api.get<{ profile: Profile }>('profile', params?.config);
