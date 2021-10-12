import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import Message from '../UI/Message';
import ToastMessage from '../UI/ToastMessage';
import PasswordForm from './PasswordForm';

const Profile = () => {
  const {
    loading,
    user: { name, email },
    error,
  } = useSelector((state) => state.auth);
  const [isEdited, setIsEdited] = useState(false);
  const [showToast, setShowToast] = useState({ message: '', show: false });
  const [updateForm, setUpdateForm] = useState({
    name: '',
    email: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setUpdateForm({ name: name || '', email: email || '' });
  }, [name, email]);
  const formChangeHandler = (e) => {
    setUpdateForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateForm));
    if (!error && !loading) {
      setShowToast({ show: true, message: 'Update successfully!' });
      setIsEdited(false);
    }
  };
  return (
    <>
      <ToastMessage
        show={showToast.show}
        onClose={setShowToast.bind(null, { show: false, message: '' })}
        message='Update successfully!'
      />
      <Row className='justify-content-between'>
        <Col>
          <h1>USER PROFILE</h1>
        </Col>
        <Col className='align-content-center my-auto flex'>
          <Row className='justify-content-end'>
            {isEdited && (
              <Button
                variant='danger'
                size='sm'
                className='mr-3'
                onClick={setIsEdited.bind(null, false)}>
                Cancel
              </Button>
            )}
            <Button
              variant='outline-dark'
              size='sm'
              onClick={setIsEdited.bind(null, true)}>
              Edit
            </Button>
          </Row>
        </Col>
      </Row>
      <Form>
        <FormGroup controlId='name'>
          {error && <Message variant='danger' text={error} />}
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            value={updateForm.name}
            onChange={formChangeHandler}
            readOnly={!isEdited}></Form.Control>
        </FormGroup>
        <FormGroup controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={updateForm.email}
            onChange={formChangeHandler}
            readOnly={!isEdited}></Form.Control>
        </FormGroup>
        {}
        <Button
          type='submit'
          onClick={updateProfileHandler}
          disabled={!isEdited}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </Form>

      <Accordion className='my-4'>
        <Accordion.Toggle as={Button} variant='link' size='sm' eventKey='0'>
          Change password
        </Accordion.Toggle>
        <Card>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <PasswordForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default Profile;
