import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderedProducts = ({ orderItems }) => {
  return (
    <>
      <h2>Order Items</h2>
      <ListGroup variant='flush'>
        {orderItems.length > 0 &&
          orderItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={4}>
                  {item.quantity} x ${item.price} = $
                  {+item.quantity * +item.price}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default OrderedProducts;
