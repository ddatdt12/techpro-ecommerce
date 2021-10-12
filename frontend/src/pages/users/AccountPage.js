import React from 'react';
import { Col, ListGroup, Row, Tab } from 'react-bootstrap';
import Profile from '../../components/User/Profile';
import ShippingAddress from '../../components/User/ShippingAddress';
import UserOrder from '../../components/User/UserOrder';

const AccountScreen = ({ location }) => {
  console.log(location);
  return (
    <Tab.Container
      id='list-group-tabs'
      defaultActiveKey={location.hash ? location.hash : '#profile'}>
      <Row className='py-3'>
        <Col sm={3}>
          <ListGroup>
            <ListGroup.Item action href='#profile'>
              Profile
            </ListGroup.Item>
            <ListGroup.Item
              action
              href='#shipping-address'>
              My shipping address
            </ListGroup.Item>
            <ListGroup.Item action href='#order'>
              My order
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey='#profile'>
              <Profile />
            </Tab.Pane>
            <Tab.Pane eventKey='#shipping-address'>
              <ShippingAddress />
            </Tab.Pane>
            <Tab.Pane eventKey='#order'>
              <UserOrder />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default AccountScreen;
