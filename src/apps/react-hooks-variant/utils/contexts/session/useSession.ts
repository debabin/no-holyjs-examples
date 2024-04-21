import React from 'react';

import { SessionContext } from './SessionContext';

export const useSession = () => React.useContext(SessionContext);
