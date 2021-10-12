import React from 'react';

const AddressInfo = ({ name, phoneNumber, shippingAddress }) => {
  return (
    <>
      <h2>Shipping</h2>
      <p>
        <strong>Name: </strong>
        {name}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {phoneNumber}
      </p>
      <p>
        <strong>Address: </strong>
        {shippingAddress.address},
        <br />
        District: {shippingAddress.district} ,
        <br />
        City: {shippingAddress.city}
      </p>
    </>
  );
};

export default AddressInfo;
