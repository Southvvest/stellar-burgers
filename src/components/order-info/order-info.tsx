import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchFeeds } from '../../services/reducers/feedsSlice';

// Вычисление карты ингредиентов
const useIngredientsMap = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  return useMemo(() => {
    const map = new Map<string, TIngredient>();
    ingredients.forEach((ingredient) => {
      map.set(ingredient._id, ingredient);
    });
    return map;
  }, [ingredients]);
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderNumber = number ? parseInt(number) : 0;

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feeds.orders);
  const ingredientsMap = useIngredientsMap();

  // Если заказы ещё не загружены — подгружаем
  useEffect(() => {
    if (!orders.length) dispatch(fetchFeeds());
  }, [dispatch, orders.length]);

  // Находим заказ по номеру
  const orderData = orders.find((order) => order.number === orderNumber);

  // Готовим данные для отображения
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredientsMap.size) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredientsMap.get(item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredientsMap]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
