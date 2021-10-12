import React from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import PriceInfo from '../UI/PriceInfo';

const ProductsInfo = ({
  step,
  orderSummary: {
    items,
    shippingCost,
    discount,
    discountPrice,
    itemsPrice,
    totalPrice,
  },
}) => {
  return (
    <>
      <h4>Products</h4>
      <ListGroup variant='flush'>
        <div className='product-list'>
          {items.map((product) => (
            <ListGroup.Item key={product.productId}>
              <Row>
                <Col md={4}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={8}>
                  <h6>{product.brand}</h6>
                  <p>{product.name}</p>
                  <div>
                    Price: ${product.price} x {product.quantity}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </div>
        {step <= 2 && (
          <ListGroup.Item>
            <Form>
              <FormGroup controlId='district'>
                <Form.Label>Discount</Form.Label>
                <Row>
                  <Col md={9}>
                    <Form.Control
                      type='text'
                      placeholder='Enter discount '
                      name='discount'></Form.Control>
                  </Col>
                  <Col md={3} size='sm' className='btn-block'>
                    <Button type='submit'>Use</Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <PriceInfo
            priceData={{
              shippingCost,
              discount,
              discountPrice,
              itemsPrice,
              totalPrice,
            }}
          />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ProductsInfo;
