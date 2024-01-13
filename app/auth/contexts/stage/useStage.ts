import React from 'react';

import { StageContext } from './StateContext';

export const useStage = () => React.useContext(StageContext);
