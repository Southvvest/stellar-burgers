import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import {
  setOrderRequest,
  setOrderModalData
} from '../../services/reducers/burgerConstructorSlice';
import { RootState } from '../../services/store';
import { getUser } from '../../services/reducers/selectors';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: взять переменные constructorItems, orderRequest и orderModalData из стора
  const { bun, ingredients, orderRequest, orderModalData } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const user = useSelector(getUser);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    // Проверка авторизации перед оформлением заказа
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    // Собираем ID ингредиентов
    const ingredientIds = [
      constructorItems.bun.id,
      ...constructorItems.ingredients.map((item) => item.id)
    ];

    // Отправляем заказ
    dispatch(setOrderRequest(true));

    setTimeout(() => {
      const mockOrder: TOrder = {
        _id: '123',
        status: 'pending',
        name: 'Ваш бургер',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        number: 12345,
        ingredients: ingredientIds
      };
      dispatch(setOrderModalData(mockOrder));
      dispatch(setOrderRequest(false));
    }, 1500);
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
