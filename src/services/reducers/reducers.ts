import { combineReducers } from 'redux';
import authReducer from '../reducers/authSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import ingredientsReducer from './ingredientsSlice';
import feedsReducer from './feedsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer
});

export default rootReducer;
