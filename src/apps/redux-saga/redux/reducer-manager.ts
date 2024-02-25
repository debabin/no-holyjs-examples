import { combineReducers, type Reducer } from '@reduxjs/toolkit';

type ReducerMap = Map<string, Reducer<any, any>>;

export const createReducerManager = (staticReducers: any) => {
  const reducers: ReducerMap = new Map();

  const add = (key: string, reducer: Reducer<any, any>) => {
    reducers.set(key, reducer);
  };

  const remove = (key: string) => {
    reducers.delete(key);
  };

  const get = () => Object.fromEntries(reducers);

  const create = () => {
    console.log('@', {
      ...staticReducers,
      ...get()
    });
    return combineReducers({
      ...staticReducers,
      ...get()
    });
  };

  return {
    add,
    remove,
    get,
    create
  };
};
