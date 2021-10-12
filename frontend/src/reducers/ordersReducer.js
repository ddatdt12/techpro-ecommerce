import {
  CREATE_ORDER_SUCCESS,
  ORDERS_REQUEST_LOADING,
  CREATE_ORDER_FAIL,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  RESET_ORDER_STATE,
} from '../constants/orderConstants';

const initialState = {
  orders: [],
  error: null,
  create_success: false,
  orderLoading: false,
};

export const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_ORDER_STATE:
      return initialState;

    case ORDERS_REQUEST_LOADING:
      return {
        ...state,
        create_success: false,
        orderLoading: true,
        error: null,
      };

    case MY_ORDER_LIST_SUCCESS:
      return {
        ...state,
        orders: payload,
        error: null,
        orderLoading: false,
      };
    case MY_ORDER_LIST_FAIL:
      return {
        ...state,
        orders: [],
        error: payload,
        orderLoading: false,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        create_success: true,
        orderLoading: false,
        orders: [payload, ...state.orders],
      };
    case CREATE_ORDER_FAIL:
      return { ...state, create_success: false, orderLoading: false };

    default:
      return state;
  }
};
