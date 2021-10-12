import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_LOADING,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CHANGE_QUANTITY,
  GET_SHOPPING_CART,
  EMPTY_CART,
  CLEAR_CART_AFTER_ORDER,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_LOADING:
      return { ...state, cartLoading: true };
    case GET_SHOPPING_CART:
    case CART_ADD_ITEM:
    case CHANGE_QUANTITY:
    case CART_REMOVE_ITEM:
      return { ...state, ...payload, cartLoading: false };
    case EMPTY_CART:
    case CLEAR_CART_AFTER_ORDER:
      return {
        cartItems: [],
        totalPrice: 0,
        totalQuantity: 0,
        cartLoading: false,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };
    case CART_FAIL:
      return { ...state, error: payload };

    default:
      return state;
  }
};
