import {
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
  ORDER_REQUEST,
} from '../constants/orderConstants';

const initialState = {
  order: {},
  loading: false,
  success: false,
  error: null,
};

export const orderDetailsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case ORDER_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        order: payload,
      };
    case GET_ORDER_DETAILS_FAIL:
      return { ...state, loading: false, success: false, error: payload };
    default:
      return state;
  }
};
