import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    registerUserApi({ email, name: userName, password })
      .then((data) => {
        // Сохраняем токены
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Редиректим на главную страницу
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setError(err.message || 'Ошибка при регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      userName={userName}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
