const listeners: Record<string, any[]> = {};
console.log('@listeners', listeners);

export const emitChange = (key: string) => {
  if (!listeners[key]) throw new Error(`No listeners for ${key}`);

  for (const listener of listeners[key]) {
    listener();
  }
};

export const createStore = <T>(key: string, data: T) => {
  listeners[key] = [];

  const emitChange = () => {
    for (const listener of listeners[key]) {
      listener();
    }
  };
  const subscribe = (listener: any) => {
    listeners[key] = [...listeners[key], listener];

    return () => {
      listeners[key] = listeners[key].filter((l: any) => l !== listener);
    };
  };

  return {
    data,
    emitChange,
    subscribe,
    set(updatedData: T) {
      data = updatedData;
      emitChange();
    },
    get() {
      return data;
    },
    getSnapshot() {
      return data;
    }
  };
};
