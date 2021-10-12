import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveAddressData } from '../../actions/userActions';
import Message from '../UI/Message';

const AddressForm = () => {
  const {
    loading,
    user: { shippingAddress, phoneNumber },
    error,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addressForm, setAddressForm] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
  });

  useEffect(() => {
    setAddressForm({
      phoneNumber: phoneNumber || '',
      address:
        shippingAddress && shippingAddress.address
          ? shippingAddress.address
          : '',
      city: shippingAddress && shippingAddress.city ? shippingAddress.city : '',
      district:
        shippingAddress && shippingAddress.district
          ? shippingAddress.district
          : '',
    });
  }, [phoneNumber, shippingAddress]);
  const addressChangeHandler = (e) => {
    setAddressForm((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const addressFormHandler = (e) => {
    e.preventDefault();
    dispatch(saveAddressData(addressForm));
  };

  return (
    <div>
      <Link to='/profile#shipping-address'>
        <Button className='btn-secondary mb-3' size='sm'>
          Go Back
        </Button>
      </Link>
      <h3>Update address</h3>
      <Form>
        {error && <Message variant='danger' text={error} />}
        <FormGroup controlId='phoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phoneNumber'
            value={addressForm.phoneNumber || ''}
            onChange={addressChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            value={addressForm.address || ''}
            onChange={addressChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='district'>
          <Form.Label>District</Form.Label>
          <Form.Control
            type='text'
            name='district'
            value={addressForm.district || ''}
            onChange={addressChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            name='city'
            value={addressForm.city || ''}
            onChange={addressChangeHandler}></Form.Control>
        </FormGroup>
        <Button type='submit' onClick={addressFormHandler}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </Form>
    </div>
  );
};
export default AddressForm;
