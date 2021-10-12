import {
  productListReducer,
  productDetailsReducer,
} from '../reducers/productReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';
import { ordersReducer } from './ordersReducer';
import { combineReducers } from 'redux';
import { orderDetailsReducer } from './orderDetailsReducer';

export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  auth: userReducer,
  ordersReducer: ordersReducer,
  orderDetailsReducer: orderDetailsReducer,
});
