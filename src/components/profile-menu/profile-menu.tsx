import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutApi } from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { setUser } from '../../services/reducers/authSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutApi()
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.error('Ошибка при выходе:', error);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
