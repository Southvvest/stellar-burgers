import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/reducers/feedsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders = useSelector((state) => state.feeds.orders);

  useEffect(() => {
    // Загружаем заказы пользователя
    dispatch(fetchFeeds());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
