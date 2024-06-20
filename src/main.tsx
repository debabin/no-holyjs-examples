import { init as reactHooksVariant } from './apps/react-hooks-variant/main';
import { init as reatomVariant } from './apps/reatom-variant/main';
import { init as reduxSagaVariant } from './apps/redux-saga-variant/main';
import { init as reduxThunkVariant } from './apps/redux-thunk-variant/main';

const APPS = {
  'react-hooks-variant': reactHooksVariant,
  'reatom-variant': reatomVariant,
  'redux-saga-variant': reduxSagaVariant,
  'redux-thunk-variant': reduxThunkVariant
};

console.log('app variant:', import.meta.env.VITE_APP);
APPS[import.meta.env.VITE_APP]();
