import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/actions/authActions';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { IngredientDetails, OrderInfo, Modal, AppHeader } from '@components';

import ProtectedRoute from '../protected-route';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Для модальных роутов
  const backgroundLocation = location.state?.background;

  // Проверка авторизации и загрузка ингредиентов при монтировании приложения
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => {
    const { pathname } = location;
    if (pathname.startsWith('/profile/orders/')) {
      navigate('/profile/orders');
    } else {
      navigate(backgroundLocation?.pathname || '/', { replace: true });
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={backgroundLocation || location}>
        {/* Главная страница */}
        <Route path='/' element={<ConstructorPage />} />

        {/* Страница ленты */}
        <Route path='/feed' element={<Feed />} />

        {/* Защищённые маршруты */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищённые роуты */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Детали заказа */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />

        {/* Детали ингредиента */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Не защищённые */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные руты */}
      {backgroundLocation && (
        <Routes>
          {/* /feed/:number как модалка */}
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.split('/').pop()}`}
                onClose={closeModal}
              >
                <OrderInfo />
              </Modal>
            }
          />
          {/* /ingredients/:id как модалка */}
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          {/* /profile/orders/:number как модалка (защищённый маршрут) */}
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${location.pathname.split('/').pop()}`}
                  onClose={closeModal}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
