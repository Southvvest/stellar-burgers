import React from 'react';
import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  getUser
} from '../../services/reducers/selectors';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUser);
  const location = useLocation();

  // Показывать прелоадер, пока не завершит проверку авторизации
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если пользователь авторизован
  if (onlyUnAuth && user) {
    // Редиректим на главную страницу
    return <Navigate to='/' replace />;
  }

  // Если требуется авторизация, и пользователь не авторизован
  if (!onlyUnAuth && !user) {
    // Редиректим на страницу логина, сохраняя предыдущий путь
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
