import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderAction';
import PaymentStep from '../../components/Checkout/Payment/PaymentStep';
import PlaceOrder from '../../components/Checkout/PlaceOrder';
import ProductsInfo from '../../components/Checkout/ProductsInfo';
import CheckoutStep from '../../components/Checkout/ShippingAddress/CheckoutStep';
import ShippingAddressInfo from '../../components/Checkout/ShippingAddress/ShippingAddressInfo';
const CheckoutScreen = ({ history, location }) => {
  const {
    user: { name, shippingAddress, phoneNumber },
  } = useSelector((state) => state.auth);
  const {
    orderLoading,
    orders: [newOrder], //It's mean Getting first element of array, which is order just added
    create_success,
  } = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (create_success) {
      history.replace(`/orders/${newOrder._id}`);
    }
  }, [history, dispatch, create_success, newOrder]);

  //Order summery
  const { cartItems, itemsPrice, paymentMethod } = useSelector(
    (state) => state.cart,
  );

  const shippingCost = cartItems.length > 10 ? 0 : 2;

  //Discount 15%
  const discount = 0.15;
  const discountPrice = itemsPrice * 0.15;
  const totalPrice = (itemsPrice + shippingCost - discountPrice).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        phoneNumber,
        paymentMethod,
        itemsPrice,
        shippingPrice: shippingCost,
        discountPrice,
        totalPrice,
      }),
    );
  };

  const step = location.search.startsWith('?step')
    ? location.search.split('=')[1]
    : '1';

  return (
    <>
      <CheckoutStep step={step} />
      <Row>
        <Col md={7}>
          {step === '1' && (
            <ShippingAddressInfo
              name={name}
              shippingAddress={shippingAddress}
              phoneNumber={phoneNumber}
            />
          )}
          {step === '2' && <PaymentStep />}
          {step === '3' && (
            <PlaceOrder
              userInfo={{ name, shippingAddress, phoneNumber }}
              orderLoading={orderLoading}
              placeOrderHandler={placeOrderHandler}
            />
          )}
        </Col>
        <Col md={5}>
          <ProductsInfo
            step={step}
            orderSummary={{
              items: cartItems,
              shippingCost,
              discount,
              discountPrice,
              itemsPrice,
              totalPrice,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CheckoutScreen;
