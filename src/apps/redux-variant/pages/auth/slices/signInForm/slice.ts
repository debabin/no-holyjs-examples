import { createFormSlice } from '@redux-variant/redux/create-form';

interface SingInFormValues {
  login: string;
  password: string;
}

const initialValues: SingInFormValues = { login: '123', password: '' } satisfies SingInFormValues;

export const signInForm = createFormSlice({
  prefix: 'auth',
  name: 'signInForm',
  initialValues,
  onSubmit: (values) => {
    window.alert(JSON.stringify(values));
  }
});
