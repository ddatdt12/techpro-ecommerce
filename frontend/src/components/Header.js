import React from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const location = useLocation();

  console.log(location) 
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand to='/' as={Link}>
          TechPro  
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link
                to='/cart'
                as={Link}
                variant='dark'
                className='text-white'>
                <i className='fa fa-shopping-cart mr-1'>Cart</i>
                {cartItems.length > 0 && (
                  <Badge variant='light' pill className='px-2'>
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>

              {isAuthenticated ? (
                <NavDropdown
                  title={user.name}
                  id='basic-nav-dropdown'
                  size='lg'
                  className='nav-link-white'>
                  <NavDropdown.Item to='/profile' as={Link} className='py-2'>
                    My account
                  </NavDropdown.Item>
                  <NavDropdown.Item to='/orders' as={Link} className='py-2'>
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider className='my-2' />
                  <NavDropdown.Item onClick={logoutHandler} className='py-2'>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link to='/login' as={Link}>
                  <i className='fa fa-user' />
                  Sign in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
