import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface AuthState {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthChecked: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  }
});

export const { setUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
