import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItem from '../../components/Cart/ListItem';
import Message from '../../components/UI/Message';

const CartScreen = ({ history }) => {
  const { cartItems, cartLoading, itemsPrice, totalQuantity } = useSelector(
    (state) => state.cart,
  );

  const CheckoutHandler = () => {
    history.push('/checkout?step=1');
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 && (
          <Message text='Your cart is empty'>
            <Link to='/'>Go back</Link>
          </Message>
        )}
        {!(cartItems.length === 0) && (
          <ListItem cartLoading={cartLoading} cartItems={cartItems} />
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({totalQuantity}) items</h2>${itemsPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={CheckoutHandler}>
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
