import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import FormContainer from '../components/UI/FormContainer';
import Message from '../components/UI/Message';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

const LoginScreen = ({ history, location }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const formChangeHandler = (e) => {
    setLoginData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = (e) => {
    dispatch(login(loginData));
    e.preventDefault();
  };

  console.log('Login : ',location)

  return (
    <FormContainer>
      <h1>LOG IN</h1>
      {error && <Message variant='danger' text={error} />}

      <Form>
        <FormGroup controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={loginData.email}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={loginData.password}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <Button type='submit' onClick={submitHandler} disabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </Button>
        <Row>
          <Col>
            New Customer{'  '}
            <Link
              className='text-link'
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
