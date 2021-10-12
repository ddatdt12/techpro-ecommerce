import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { isShippingInfoFull } from '../../../utils/support';

const ShippingAddressInfo = ({ name, shippingAddress, phoneNumber }) => {
  const isShown = isShippingInfoFull({ shippingAddress, phoneNumber });
  console.log('test')
  return (
    <>
      <h3>Shipping Address</h3>
      {isShown && (
        <Table striped>
          <thead>
            <tr>
              <th className='visually-hidden'>Description</th>
              <th className='visually-hidden'>Description</th>
              <th className='visually-hidden'>Description</th>
              <th className='visually-hidden'>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name: </td>
              <td colSpan='4'>{name && name}</td>
            </tr>
            <tr>
              <td>Phone number: </td>
              <td colSpan='4'>{phoneNumber && phoneNumber}</td>
            </tr>
            <tr>
              <td>Address: </td>
              <td colSpan='4'>
                {shippingAddress.address && shippingAddress.address}
              </td>
            </tr>
            <tr>
              <td>City: </td>
              <td colSpan='4'>
                {shippingAddress.city && shippingAddress.city}
              </td>
            </tr>
            <tr>
              <td>District: </td>
              <td colSpan='4'>
                {shippingAddress.district && shippingAddress.district}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      {!isShown && (
        <h1>Your shipping address is unavailable. Please update them!</h1>
      )}
      {isShown && (
        <Button
          as={Link}
          to='/checkout?step=2'
          type='button'
          size='md'
          className='mb-4'>
          Continue
        </Button>
      )}
      <p className='mb-1'>If you want to update the shipping address</p>
      <Link to='/profile#shipping-address' className='text-link'>
        Click here
      </Link>
    </>
  );
};

export default ShippingAddressInfo;
