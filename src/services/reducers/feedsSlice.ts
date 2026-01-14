import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { TOrder } from '@utils-types';

interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<TOrdersData>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.loading = false;
      state.error = null;
    },
    setFeedsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFeedsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setFeeds, setFeedsLoading, setFeedsError } = feedsSlice.actions;
export default feedsSlice.reducer;
