import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { loginUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { LoginUI } from '@ui-pages';
import { setUser } from '../../services/reducers/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    loginUserApi({ email, password })
      .then((data) => {
        // Сохраняем токены
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Обновляем состояние пользователя в Redux
        dispatch(setUser(data.user));

        // Получаем предыдущий путь из location.state
        const from =
          (location.state as { from?: { pathname: string } })?.from?.pathname ||
          '/';
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message || 'Ошибка при входе');
      });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
