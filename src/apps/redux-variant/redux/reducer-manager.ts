import { combineReducers, type Reducer } from '@reduxjs/toolkit';

type ReducerMap = Map<string, Reducer<any, any>>;

export const createReducerManager = <InitialReducers extends Record<string, Reducer<any, any>>>(
  initialReducers: InitialReducers
) => {
  const reducers: ReducerMap = new Map(Object.entries(initialReducers));

  const add = (key: string, reducer: Reducer<any, any>) => reducers.set(key, reducer);
  const remove = (key: string) => reducers.delete(key);
  const get = () => Object.fromEntries(reducers);
  const create = () => combineReducers(get());

  return {
    add,
    remove,
    get,
    create
  };
};
