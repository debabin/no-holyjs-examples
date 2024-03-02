import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  value: Profile;
}

const initialState: ProfileState = { value: {} } as ProfileState;

export const name = 'profile';
export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.value = action.payload;
    }
  },
  selectors: {
    getProfile: (state) => state.value
  }
});
