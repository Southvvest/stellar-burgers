import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        (err as Error).message || 'Не удалось загрузить ингредиенты'
      );
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setIngredients, setLoading, setError } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
