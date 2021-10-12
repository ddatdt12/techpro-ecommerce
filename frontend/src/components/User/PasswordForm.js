import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import Message from '../UI/Message';

const initialState = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};

const PasswordForm = () => {
  const [isEditedPassword, setIsEditedPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initialState);
  const [message, setMessage] = useState({ type: null, text: '' });
  const formPasswordChangeHandler = (e) => {
    setPasswordForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const resetForm = () => {
    setIsEditedPassword(false);
    setPasswordForm(initialState);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/updateMyPassword',
        passwordForm,
      );
      setMessage({
        type: 'success',
        text: data.message,
      });
    } catch (error) {
      console.log(error.response);
      setMessage({
        type: 'error',
        text:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }

    setTimeout(() => {
      if (message.type === 'success') {
        resetForm();
      }
      setMessage({ type: null, message: '' });
    }, 5000);
  };
  return (
    <Form>
      {message.type && (
        <Message
          text={message.text}
          variant={message.type === 'error' ? 'danger' : 'success'}
        />
      )}
      <FormGroup controlId='currentPassword'>
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type='password'
          name='currentPassword'
          value={passwordForm.currentPassword}
          onChange={formPasswordChangeHandler}
          readOnly={!isEditedPassword}></Form.Control>
      </FormGroup>
      <FormGroup controlId='newPassword'>
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={passwordForm.password}
          onChange={formPasswordChangeHandler}
          readOnly={!isEditedPassword}></Form.Control>
      </FormGroup>
      <FormGroup controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          name='confirmPassword'
          value={passwordForm.confirmPassword}
          onChange={formPasswordChangeHandler}
          readOnly={!isEditedPassword}></Form.Control>
      </FormGroup>
      {isEditedPassword && (
        <>
          <Button
            type='submit'
            variant='success'
            onClick={submitHandler}
            className='mr-3'>
            {'Change'}
          </Button>
          <Button type='button' variant='danger' onClick={resetForm}>
            {'Cancel'}
          </Button>
        </>
      )}
      {!isEditedPassword && (
        <>
          <Button type='button' onClick={setIsEditedPassword.bind(null, true)}>
            {'Edit'}
          </Button>
        </>
      )}
    </Form>
  );
};

export default PasswordForm;
