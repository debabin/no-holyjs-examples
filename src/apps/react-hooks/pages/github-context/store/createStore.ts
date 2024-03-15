const listeners: Record<string, any[]> = {};
console.log('@listeners', listeners);

export const emitChange = (key: string) => {
  if (!listeners[key]) throw new Error(`No listeners for ${key}`);

  for (const listener of listeners[key]) {
    listener();
  }
};

const subscribe = (key: string) => (listener: any) => {
  listeners[key] = [...listeners[key], listener];

  return () => {
    listeners[key] = listeners[key].filter((l: any) => l !== listener);
  };
};

export const computedStore = <T>(key: string, data: () => T) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }

  return {
    subscribe: subscribe(key),
    getSnapshot() {
      return data();
    }
  };
};

export const createStore = <T>(key: string, data: T) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }

  return {
    data,
    emitChange: () => emitChange(key),
    subscribe: subscribe(key),
    set(updatedData: T) {
      data = updatedData;
      emitChange(key);
    },
    get() {
      return data;
    },
    getSnapshot() {
      return data;
    }
  };
};
