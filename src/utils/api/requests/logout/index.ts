import { api } from '../../instance';

export const deleteLogout = (params?: RequestConfig) => api.delete(`signin`, params?.config);
