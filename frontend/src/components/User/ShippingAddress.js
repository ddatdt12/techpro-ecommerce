import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isShippingInfoFull } from '../../utils/support';
import AddressForm from './AddressForm';
import AddressInfo from './AddressInfo';
import { Link, useLocation } from 'react-router-dom';

const ShippingAddress = () => {
  const {
    user: { name, shippingAddress, phoneNumber },
  } = useSelector((state) => state.auth);
  const location = useLocation();
  const isShown = isShippingInfoFull({ shippingAddress, phoneNumber });

  return (
    <>
      {location.search !== '?status=update' ? (
        <ListGroup variant='flush'>
          {isShown ? (
            <ListGroup.Item>
              <AddressInfo
                name={name}
                shippingAddress={shippingAddress}
                phoneNumber={phoneNumber}
              />
            </ListGroup.Item>
          ) : (
            <ListGroup.Item>Empty Address</ListGroup.Item>
          )}

          <ListGroup.Item>
            <Link to={`${location.pathname}?status=update${location.hash}`}>
              {isShown ? 'Click here to update' : 'Add new address'}
            </Link>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <AddressForm />
      )}
    </>
  );
};

export default ShippingAddress;
