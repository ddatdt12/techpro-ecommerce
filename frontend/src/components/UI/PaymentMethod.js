import React from 'react';

const PaymentMethod = ({ paymentMethod }) => {
  return (
    <>
      <h2>Payment Method</h2>
      <strong >Method: </strong>
      {paymentMethod}
    </>
  );
};

export default PaymentMethod;
