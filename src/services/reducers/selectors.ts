import { RootState } from '../store';

export const isAuthCheckedSelector = (state: RootState) =>
  state.auth.isAuthChecked;
export const getUser = (state: RootState) => state.auth.user;
