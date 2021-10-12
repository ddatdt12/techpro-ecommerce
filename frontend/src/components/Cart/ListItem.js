import React from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeQuantity, removeItem } from '../../actions/cartAction';

const ListItem = ({ cartItems, cartLoading }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = (productId) => { 
    dispatch(removeItem(productId));
  };

  return (
    <ListGroup variant='flush'>
      {cartItems.map((item) => (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={item.image} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/products/${item.productId}`}>{item.name}</Link>
            </Col>
            <Col md={2}>${item.price}</Col>
            <Col md={2}>
              <Form.Control
                as='select'
                disabled={cartLoading}
                value={item.quantity}
                className='px-2'
                onChange={(e) => {
                  dispatch(changeQuantity(item.productId, e.target.value));
                }}>
                {[...Array(item.countInStock).keys()].map((key) => (
                  <option key={key + 1} value={key + 1}>
                    {key + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button
                type='button'
                variant='light'
                onClick={removeItemFromCart.bind(null, item.productId)}>
                <i className='fa fa-trash'></i>
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListItem;
