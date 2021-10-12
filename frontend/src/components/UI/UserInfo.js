import React from 'react';

const UserInfo = ({
  userInfo: { name, email, shippingAddress, phoneNumber },
}) => {
  return (
    <div>
      <h2>Shipping</h2>
      {name && (
        <p>
          <strong>Name: </strong>
          {name}
        </p>
      )}
      {email && (
        <p>
          <strong>Email: </strong>
          {email}
        </p>
      )}
      {phoneNumber && (
        <p>
          <strong>Phone Number: </strong>
          {phoneNumber}
        </p>
      )}
      {shippingAddress && (
        <p>
          <strong>Address: </strong>
          {`${shippingAddress.address}, ${shippingAddress.district}, ${shippingAddress.city}`}
        </p>
      )}
    </div>
  );
};

export default UserInfo;
