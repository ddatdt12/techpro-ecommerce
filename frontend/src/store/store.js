import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import { getAuthentication } from '../actions/userActions';
import { reducers } from '../reducers';

const authInfo = Cookies.get('jwt') ? { user: {}, isAuthenticated: true } : {};
const initialState = {
  auth: authInfo,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);
store.dispatch(getAuthentication());

export default store;
