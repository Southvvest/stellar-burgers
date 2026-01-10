import React from 'react';
import { useSelector } from 'src/services/store';
import { isAuthCheckedSelector, getUser } from 'src/services/reducers';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Пока проверка авторизации — показываем прелоадер
    return <Preloader />;
  }

  if (!user) {
    // Не авторизован — редирект на /login, с сохранением исходного урла
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Авторизован — показываем защищенное содержимое
  return <>{children}</>;
};