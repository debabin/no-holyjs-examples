type Slice<State> = import('@reduxjs/toolkit').Reducer<State>;
type AnySlice = Slice<any>;
type SliceState<A extends AnySlice> = A extends Slice<infer State> ? State : never;

type SagaAction<Type, Payload = undefined> = Payload extends undefined
  ? import('@reduxjs/toolkit').Action<Type>
  : import('@reduxjs/toolkit').Action<Type> & { payload: Payload };
