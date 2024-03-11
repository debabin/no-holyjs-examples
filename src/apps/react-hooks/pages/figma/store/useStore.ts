import React from 'react';

import type { createStore } from './createStore';

export const useStore = <Store extends ReturnType<typeof createStore>>(store: Store) =>
  React.useSyncExternalStore(store.subscribe, store.getSnapshot) as ReturnType<
    Store['getSnapshot']
  >;
