import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isShippingInfoFull } from '../../utils/support';
import PaymentMethod from '../UI/PaymentMethod';
import UserInfo from '../UI/UserInfo';
const PlaceOrder = ({ userInfo, placeOrderHandler, orderLoading }) => {
  const history = useHistory();

  const { shippingAddress, phoneNumber } = userInfo;

  if (!isShippingInfoFull({ shippingAddress, phoneNumber })) {
    history.push('/checkout?step=1');
  }

  const { paymentMethod } = useSelector((state) => state.cart);
  return (
    <>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <UserInfo userInfo={userInfo} />
        </ListGroup.Item>
        <ListGroup.Item>
          {paymentMethod && <PaymentMethod paymentMethod={paymentMethod} />}
        </ListGroup.Item>
      </ListGroup>
      <Button type='button' className='btn-block' onClick={placeOrderHandler}>
        {orderLoading ? 'Loading...' : 'Place Order'}
      </Button>
    </>
  );
};

export default PlaceOrder;
