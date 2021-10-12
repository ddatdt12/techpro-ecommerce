import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import './bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/users/AccountPage';
import CartPage from './pages/users/CartPage';
import CheckoutPage from './pages/users/CheckoutPage';

import AuthRoute from './Routes/AuthRoute';
import Switch from 'react-bootstrap/esm/Switch';
import ProtectedRoute from './Routes/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './actions/cartAction';
import MyOrderListPage from './pages/orders/MyOrderListPage';
import OrderDetailsPage from './pages/orders/OrderDetailsPage';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Header className='py-3' />
      <main>
        <Container>
          <Switch>
            <AuthRoute path='/login' component={LoginPage} exact />
            <AuthRoute path='/register' component={RegisterPage} exact />

            <ProtectedRoute path='/cart/:id?' component={CartPage} exact />
            <ProtectedRoute path='/checkout' component={CheckoutPage} exact />

            <Route path='/products/:id' component={ProductDetailsPage} exact />
            <Route path='/' component={HomePage} exact />

            <ProtectedRoute path='/orders' component={MyOrderListPage} exact />
            <ProtectedRoute path='/orders/:id' component={OrderDetailsPage} exact />

            <ProtectedRoute path='/profile' component={AccountPage} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
