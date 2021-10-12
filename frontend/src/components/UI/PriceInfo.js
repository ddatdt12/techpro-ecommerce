import React from 'react';
import { Table } from 'react-bootstrap';

const PriceInfo = ({
  priceData: { itemsPrice, shippingCost, discountPrice, totalPrice },
}) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th className='visually-hidden'>Description</th>
          <th className='visually-hidden'>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price: </td>
          <td className='text-right'>${itemsPrice}</td>
        </tr>
        <tr>
          <td>Shipping cost: </td>
          <td className='text-right'>${shippingCost}</td>
        </tr>
        <tr>
          <td>Discount: </td>
          <td className='text-right'>
            ${discountPrice.toFixed(2)} ({(discountPrice / itemsPrice) * 100}%)
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 25 }}>Total Price: </td>
          <td className='text-right' style={{ fontSize: 25 }}>
            ${totalPrice}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PriceInfo;
