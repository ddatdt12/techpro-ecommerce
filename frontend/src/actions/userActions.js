import axios from 'axios';
import Cookies from 'js-cookie';
import { EMPTY_CART } from '../constants/cartConstants';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOGOUT,
  USER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

export const getAuthentication = () => async (dispatch) => {
  try {
    const { data } = await axios('/api/auth');
    dispatch({
      type: AUTH_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    if (Cookies.get('jwt')) {
      Cookies.remove('jwt');
    }
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const { data } = await axios('/api/auth/login', {
      method: 'POST',
      data: user,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register = (registerData) => async (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const { data } = await axios('/api/auth/register', {
      method: 'POST',
      data: registerData,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    await axios('/api/auth/logout');
    dispatch({
      type: EMPTY_CART,
    });
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update user info
export const updateUser = (updatedUser) => async (dispatch) => {
  try {
    const { data } = await axios('/api/users/updateMe', {
      method: 'PUT',
      data: updatedUser,
    });
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Save user's address
export const saveAddressData = (addressForm) => async (dispatch) => {
  const sendingData = {
    shippingAddress: { ...addressForm },
    phoneNumber: addressForm.phoneNumber.trim(),
  };
  delete sendingData.shippingAddress['phoneNumber'];
  try {
    const { data } = await axios('/api/users/updateMe', {
      method: 'PUT',
      data: sendingData,
    });
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {

    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
