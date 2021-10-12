import {
  USER_REQUEST,
  AUTH_FAIL,
  AUTH_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (
  state = { loading: false, isAuthenticated: false, user: {} },
  { type, payload },
) => {
  switch (type) {
    case USER_REQUEST:
      return { loading: true, error: null };
    case AUTH_SUCCESS:
      return { loading: false, isAuthenticated: true, user: payload };
    case AUTH_FAIL:
      return { loading: false, isAuthenticated: false };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, isAuthenticated: false, error: payload };
    case USER_LOGOUT:
      return { loading: false, isAuthenticated: false, user: {} };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, isAuthenticated: false, error: payload };

    // Update user info

    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, user: payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
