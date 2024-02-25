import type { RootState } from '@redux/store';

import type { authReducer } from '..';

export const getStage = (state: RootState<{ auth: ReturnType<typeof authReducer> }>) =>
  state.auth.stage.value;
