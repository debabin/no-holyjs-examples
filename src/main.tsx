// import { init as reactHooksVariant } from './apps/react-hooks-variant/main';
// import { init as reatomVariant } from './apps/reatom-variant/main';
// import { init as reduxSagaVariant } from './apps/redux-saga-variant/main';
// import { init as reduxThunkVariant } from './apps/redux-thunk-variant/main';

const APPS = {
  'react-hooks-variant': () => import('./apps/react-hooks-variant/main'),
  'reatom-variant': () => import('./apps/reatom-variant/main'),
  'redux-saga-variant': () => import('./apps/redux-saga-variant/main'),
  'redux-thunk-variant': () => import('./apps/redux-thunk-variant/main')
};

console.log('app variant:', import.meta.env.VITE_APP);

const init = async () => {
  (await (await APPS[import.meta.env.VITE_APP])()).init();
}

init();