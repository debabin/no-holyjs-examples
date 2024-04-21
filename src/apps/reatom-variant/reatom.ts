import { createCtx } from '@reatom/framework';
import { connectLogger } from '@reatom/logger';

const isLogged = false;

export const ctx = createCtx();

if (isLogged) {
  connectLogger(ctx);
}
