import { api } from '../../../instance';

type GetProfileRequestConfig = RequestConfig | void;

export const getFigmaCards = (params?: GetProfileRequestConfig) =>
  api.get<{ figmaCards: FigmaCard[] }>('figma/cards', params?.config);
