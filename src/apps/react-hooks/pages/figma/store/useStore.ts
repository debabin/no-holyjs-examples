import React from 'react';

import type { computedStore, createStore } from './createStore';

export const useStore = <Store extends ReturnType<typeof createStore | typeof computedStore>>(
  store: Store
) =>
  React.useSyncExternalStore(store.subscribe, store.getSnapshot) as ReturnType<
    Store['getSnapshot']
  >;
