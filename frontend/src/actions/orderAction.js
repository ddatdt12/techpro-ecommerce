import axios from 'axios';
import { EMPTY_CART } from '../constants/cartConstants';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_SUCCESS,
  ORDERS_REQUEST_LOADING,
  ORDER_REQUEST,
} from '../constants/orderConstants';

export const getMyOrders = () => async (dispatch) => {
  dispatch({ type: ORDERS_REQUEST_LOADING });
  try {
    const { data } = await axios.get('/api/orders');
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//
export const getOrderDetails = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_REQUEST });
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: ORDERS_REQUEST_LOADING });
  try {
    const { data } = await axios.post('/api/orders', orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
    dispatch({ type: EMPTY_CART });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
