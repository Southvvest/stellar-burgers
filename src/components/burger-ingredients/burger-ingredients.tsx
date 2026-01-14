import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from '../../services/store';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { getIngredientsApi } from '@api';
import {
  setIngredients,
  setLoading,
  setError
} from '../../services/reducers/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();
  const { ingredients, loading } = useSelector((state) => state.ingredients);
  // const buns = [];
  // const mains = [];
  // const sauces = [];
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  useEffect(() => {
    const fetchIngredients = async () => {
      dispatch(setLoading(true)); // Явно устанавливаем loading: true
      try {
        const data = await getIngredientsApi();
        dispatch(setIngredients(data)); // Успешно
      } catch (err) {
        console.error('Ошибка загрузки ингредиентов:', err);
        dispatch(setError('Не удалось загрузить ингредиенты')); // Устанавливаем ошибку
      } finally {
        dispatch(setLoading(false)); // ВСЕГДА сбрасываем loading (даже при ошибке)
      }
    };

    fetchIngredients();
  }, [dispatch]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return null;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
