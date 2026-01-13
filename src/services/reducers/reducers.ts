import { combineReducers } from 'redux';
import authReducer from '../reducers/authSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import ingredientsReducer from './ingredientsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer
});

export default rootReducer;
