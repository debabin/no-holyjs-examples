import React from 'react';

import { ProfileContext } from './ProfileContext';

export const useProfile = () => React.useContext(ProfileContext);
