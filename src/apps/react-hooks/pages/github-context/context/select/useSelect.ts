import React from 'react';

import { SelectContext } from './SelectContext';

export const useSelect = () => React.useContext(SelectContext);
