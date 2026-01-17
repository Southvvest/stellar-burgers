import { RootState } from '../store';
import { TUser } from '@utils-types';

export const isAuthCheckedSelector = (state: RootState) =>
  state.auth.isAuthChecked;
export const getUser = (state: RootState): TUser | null => state.auth.user;
