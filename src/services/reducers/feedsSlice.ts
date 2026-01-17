import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '@api';

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

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message || 'Ошибка загрузки ленты');
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setFeeds, setFeedsLoading, setFeedsError } = feedsSlice.actions;
export default feedsSlice.reducer;
