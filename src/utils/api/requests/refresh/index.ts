import { api } from '../../instance';

export const getRefresh = (params?: RequestConfig) => api.get(`refresh`, params?.config);
