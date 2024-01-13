import { api } from '../../instance';

export const getProfile = (params?: RequestConfig) => api.get<Profile>(`profile`, params?.config);
