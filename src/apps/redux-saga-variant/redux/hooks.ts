import type { TypedUseSelectorHook } from 'react-redux';
import * as ReactRedux from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const { useDispatch, useSelector } = ReactRedux as {
  useDispatch: () => AppDispatch;
  useSelector: TypedUseSelectorHook<RootState>;
};
