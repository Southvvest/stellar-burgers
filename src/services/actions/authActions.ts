import { AppDispatch } from '../store';
import { setUser, setAuthChecked } from 'src/services/reducers';


export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  // Извлечь токен из localStorage или cookies, если есть
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Нет токена — сразу считаем, что проверка завершена, пользователь не авторизован
    dispatch(setUser(null));
    dispatch(setAuthChecked(true));
    return;
  }

  try {
    const res = await fetch('/api/auth/validate', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const userData = await res.json();
      dispatch(setUser(userData));
    } else {
      // токен недействительный
      dispatch(setUser(null));
    }
  } catch (err) {
    console.error('Ошибка проверки авторизации', err);
    dispatch(setUser(null));
  } finally {
    dispatch(setAuthChecked(true));
  }
};