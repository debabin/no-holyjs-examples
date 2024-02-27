import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { store } from './store';

interface FormState<Values> {
  values: Values;
  dirty: boolean;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  isSubmitting: boolean;
}

interface CreateFormSliceParams<Values> {
  name: string;
  prefix?: string;
  initialValues: Values;
  onSubmit: (values: Values) => void;
}

export const createFormSlice = <Values>({
  name,
  prefix,
  initialValues,
  onSubmit
}: CreateFormSliceParams<Values>) => {
  const initialState: FormState<Values> = {
    dirty: false,
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setValues: (state, action: PayloadAction<Draft<Values>>) => {
        state.values = action.payload;
      },
      setValue: (
        state,
        action: PayloadAction<{
          name: keyof Draft<Values>;
          value: string;
        }>
      ) => {
        state.values[action.payload.name] = action.payload.value;
      },
      setErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
        state.errors = action.payload;
      },
      setTouched: (state, action: PayloadAction<keyof Draft<Values>>) => {
        state.touched[action.payload] = true;
      },
      setIsSubmitting: (state, action: PayloadAction<boolean>) => {
        state.isSubmitting = action.payload;
      }
    }
  });

  const onChange = (name: keyof Draft<Values>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(slice.actions.setTouched(name));
    store.dispatch(slice.actions.setValue({ name, value: event.target.value }));
  };

  const submitHandler = () => {
    const state = store.getState();

    const formState: FormState<Values> = prefix ? state[prefix][slice.name] : state[slice.name];

    if (!formState.isSubmitting) {
      store.dispatch(slice.actions.setIsSubmitting(true));
    }

    onSubmit(formState.values);

    store.dispatch(slice.actions.setIsSubmitting(false));
  };

  return { slice, submitHandler, onChange };
};
