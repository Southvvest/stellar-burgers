import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { Feed } from '@pages';
import { NotFound404 } from '@pages';
import { IngredientDetails } from '@components';
import { OrderInfo } from '@components';
import { Modal } from '@components';
import { AppHeader } from '@components';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Для модальных роутов
  const backgroundLocation = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные роуты */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        {/* Защищённые роуты */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
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
              <Modal title='Детали заказа' onClose={closeModal}>
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
          {/* /profile/orders/:number как модалка */}
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
