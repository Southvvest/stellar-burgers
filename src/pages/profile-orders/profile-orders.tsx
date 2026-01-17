import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrdersApi } from '@api';
import { setFeeds } from '../../services/reducers/feedsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders = useSelector((state) => state.feeds.orders);

  useEffect(() => {
    // Загружаем заказы пользователя
    getOrdersApi()
      .then((ordersData) => {
        dispatch(
          setFeeds({
            orders: ordersData,
            total: ordersData.length,
            totalToday: ordersData.filter((order) => {
              const orderDate = new Date(order.createdAt);
              const today = new Date();
              return orderDate.toDateString() === today.toDateString();
            }).length
          })
        );
      })
      .catch((error) => {
        console.error('Ошибка загрузки заказов:', error);
      });
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
