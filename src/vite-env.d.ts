/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP:
    | 'react-hooks-variant'
    | 'reatom-variant'
    | 'redux-saga-variant'
    | 'redux-thunk-variant';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
