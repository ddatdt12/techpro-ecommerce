import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_LOADING,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CHANGE_QUANTITY,
  CLEAR_CART_AFTER_ORDER,
  GET_SHOPPING_CART,
} from '../constants/cartConstants';

const HandleCartDataFromServer = (cart) => {
  console.log(cart);
  const cartItems = cart.products.map((prod) => {
    return {
      ...prod.product,
      productId: prod.product._id,
      quantity: prod.quantity,
    };
  });
  return cartItems;
};

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/cart');
    const cartItems = HandleCartDataFromServer(data.cart);
    dispatch({
      type: GET_SHOPPING_CART,
      payload: {
        cartItems,
        itemsPrice: data.cart.itemsPrice,
        totalQuantity: data.cart.totalQuantity,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToCart = (product, qty) => async (dispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    const { data } = await axios.put('/api/cart', {
      productId: product._id,
      quantity: qty,
    });
    const cartItems = HandleCartDataFromServer(data.cart);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        cartItems,
        itemsPrice: data.cart.itemsPrice,
        totalQuantity: data.cart.totalQuantity,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const changeQuantity = (productId, qty) => async (dispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    const { data } = await axios.put('/api/cart', {
      productId,
      quantity: qty,
    });
    const cartItems = HandleCartDataFromServer(data.cart);
    dispatch({
      type: CHANGE_QUANTITY,
      payload: {
        cartItems,
        itemsPrice: data.cart.itemsPrice,
        totalQuantity: data.cart.totalQuantity,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_LOADING });
  try {
    const { data } = await axios.put('/api/cart', {
      actionType: 'REMOVE_ITEM',
      productId,
    });
    const cartItems = HandleCartDataFromServer(data.cart);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        cartItems,
        itemsPrice: data.cart.itemsPrice,
        totalQuantity: data.cart.totalQuantity,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLEAR_CART_AFTER_ORDER });
    await axios.put('/api/cart', {
      actionType: 'CLEAR_CART',
      productId,
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const savePaymentMethod = (method) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  });
};
