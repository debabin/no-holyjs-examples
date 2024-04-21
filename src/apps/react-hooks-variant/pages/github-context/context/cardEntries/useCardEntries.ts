import React from 'react';

import { CardEntiresContext } from './CardEntriesContext';

export const useCardEntries = () => React.useContext(CardEntiresContext);
