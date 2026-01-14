import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsApi } from '@api';
import {
  setFeeds,
  setFeedsLoading,
  setFeedsError
} from '../../services/reducers/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.feeds);

  useEffect(() => {
    const fetchFeeds = async () => {
      dispatch(setFeedsLoading(true));
      try {
        const data = await getFeedsApi();
        dispatch(setFeeds(data));
      } catch (err) {
        dispatch(
          setFeedsError((err as Error).message || 'Ошибка загрузки ленты')
        );
      }
    };

    fetchFeeds();
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
