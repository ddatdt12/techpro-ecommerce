import React from 'react';
import { Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CheckoutStep = ({ step }) => {
  const style = { fontWeight: 'bold' };
  return (
    <Nav className='justify-content-center mb-4 mt-2'>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/checkout?step=1'
          disabled={!(step >= 1)}
          style={style}>
          Shipping
        </Nav.Link>
      </Nav.Item>

      <Row className='justify-content-center align-content-center'>
        <Nav.Item>
          <i className='fas fa-chevron-right'></i>
        </Nav.Item>
      </Row>

      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/checkout?step=2'
          disabled={!(step >= 2)}
          style={style}>
          Payment
        </Nav.Link>
      </Nav.Item>

      <Row className='justify-content-center align-content-center'>
        <Nav.Item>
          <i className='fas fa-chevron-right'></i>
        </Nav.Item>
      </Row>

      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/checkout?step=3'
          disabled={!(step >= 3)}
          style={style}>
          Place order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
