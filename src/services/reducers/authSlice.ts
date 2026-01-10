// import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
// import { TUser } from '@utils-types';
// // import { RootState } from 'src/services/store';

// interface AuthState {
//   user: TUser | null;
//   isAuthChecked: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthChecked: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<TUser | null>) {
//       state.user = action.payload;
//     },
//     setAuthChecked(state, action: PayloadAction<boolean>) {
//       state.isAuthChecked = action.payload;
//     },
//   },
// });

// // Экспорт действий
// export const { setUser, setAuthChecked } = authSlice.actions;
// // Экспорт редьюсера по умолчанию
// export default authSlice.reducer;

// // селекторы
// import type { RootState } from '../../services/store';

// export const getUser = (state: RootState) => state.auth.user;
// export const isAuthCheckedSelector = (state: RootState) => state.auth.isAuthChecked;