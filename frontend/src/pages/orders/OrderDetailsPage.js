import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/UI/Loader';
import { getOrderDetails } from '../../actions/orderAction';
import Message from '../../components/UI/Message';
import { Link } from 'react-router-dom';
import { Col, ListGroup, Row } from 'react-bootstrap';
import UserInfo from '../../components/UI/UserInfo';
import PaymentMethod from '../../components/UI/PaymentMethod';
import OrderedProducts from '../../components/User/orders/OrderedProducts';
import PriceInfo from '../../components/UI/PriceInfo';

const OrderDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector(
    (state) => state.orderDetailsReducer,
  );

  const { paymentMethod } = order;
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const {
    shippingPrice: shippingCost,
    discount,
    discountPrice,
    itemsPrice,
    totalPrice,
    phoneNumber,
    shippingAddress,
    user,
  } = order;

  let body;
  if (loading || Object.keys(order).length === 0) {
    body = <Loader />;
  } else if (error) {
    body = <Message variant='danger' text={error}></Message>;
  } else if (order) {
    body = (
      <>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <UserInfo
                  userInfo={{
                    name: (user && user.name) || '',
                    email: (user && user.email) || '',
                    phoneNumber,
                    shippingAddress,
                  }}
                />
                {order.isPaid ? (
                  <Message text={`Paid on ${order.paidAt}`} />
                ) : (
                  <Message variant='danger' text='Not paid' />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {paymentMethod && (
                  <PaymentMethod paymentMethod={paymentMethod} />
                )}
                {order.isDelivered ? (
                  <Message
                    text={`Delivered on ${order.deliveredAt}`}
                    className='mt-3'
                  />
                ) : (
                  <Message
                    variant='danger'
                    text='Not Delivered'
                    className='mt-3'
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {' '}
                {order.orderItems && (
                  <OrderedProducts orderItems={order.orderItems} />
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <PriceInfo
              priceData={{
                shippingCost,
                discount,
                discountPrice,
                itemsPrice,
                totalPrice,
              }}
            />
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {body}
    </>
  );
};

export default OrderDetailsPage;
