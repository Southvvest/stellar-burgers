import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const updatedIngredients = [...state.ingredients];
      const [movedItem] = updatedIngredients.splice(fromIndex, 1);
      updatedIngredients.splice(toIndex, 0, movedItem);
      state.ingredients = updatedIngredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
