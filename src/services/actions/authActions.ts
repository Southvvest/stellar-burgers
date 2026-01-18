import { AppDispatch } from '../store';
import { setUser, setAuthChecked } from '../reducers/authSlice';
import { getUserApi } from '@api';

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  // Извлечь токен из localStorage или cookies
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    // Нет токена — пользователь не авторизован
    dispatch(setUser(null));
    dispatch(setAuthChecked(true));
    return;
  }

  try {
    // Проверяем валидность токена через API
    const userData = await getUserApi();
    dispatch(setUser(userData.user));
  } catch (err) {
    console.error('Ошибка проверки авторизации', err);
    // При ошибке считаем пользователя неавторизованным
    dispatch(setUser(null));
    // Очищаем недействительные токены
    localStorage.removeItem('refreshToken');
  } finally {
    dispatch(setAuthChecked(true));
  }
};
