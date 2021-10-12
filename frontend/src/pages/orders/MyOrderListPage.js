import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyOrders } from '../../actions/orderAction';
import OrderList from '../../components/User/orders/OrderList';

const MyOrderListPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <OrderList />
    </>
  );
};

export default MyOrderListPage;
