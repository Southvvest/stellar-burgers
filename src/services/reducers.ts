import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from './store';

// Создаем слайс для auth
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as TUser | null,
    isAuthChecked: false,
  },
  reducers: {
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
  },
});

// Экспортируем actions
export const { setUser, setAuthChecked } = authSlice.actions;

// Экспортируем редьюсер
export default authSlice.reducer;

export const getUser = (state: RootState) => state.auth.user;
export const isAuthCheckedSelector = (state: RootState) => state.auth.isAuthChecked;