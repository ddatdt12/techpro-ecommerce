import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { savePaymentMethod } from '../../../actions/cartAction';
import { isShippingInfoFull } from '../../../utils/support';

const PaymentStep = () => {
  const {
    user: { shippingAddress, phoneNumber },
  } = useSelector((state) => state.auth);
  const history = useHistory();
  if (!isShippingInfoFull({ shippingAddress, phoneNumber })) {
    history.push('/checkout?step=1');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/checkout?step=3');
  };

  return (
    <>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check
              type='radio'
              disabled
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentStep;
