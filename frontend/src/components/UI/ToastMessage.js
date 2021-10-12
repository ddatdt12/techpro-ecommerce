import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastMessage = ({ show, message, onClose }) => {
  return (
    <Toast
      animation={false}
      show={show}
      style={{
        position: 'fixed',
        top: '10%',
        right: '10px',
        zIndex: 100,
      }}
      className={`bg-light`}
      onClose={onClose}
      autohide
      delay={3000}>
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
