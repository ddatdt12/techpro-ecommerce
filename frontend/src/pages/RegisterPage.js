import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import FormContainer from '../components/UI/FormContainer';
import Message from '../components/UI/Message';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const LoginScreen = ({ history, location }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const formChangeHandler = (e) => {
    setRegisterData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = (e) => {
    dispatch(register(registerData));
    if (isAuthenticated) {
      history.push(redirect);
    }
    e.preventDefault();
  };
  return (
    <FormContainer>
      <h1>Sign up</h1>
      {error && <Message variant='danger' text={error} />}

      <Form>
        <FormGroup controlId='name'>
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            value={registerData.name}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={registerData.email}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={registerData.password}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <FormGroup controlId='password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter confirm password'
            name='confirmPassword'
            value={registerData.confirmPassword}
            onChange={formChangeHandler}></Form.Control>
        </FormGroup>
        <Button type='submit' onClick={submitHandler} disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
        <Row>
          <Col>
            Have an account ?{'  '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Log in
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
