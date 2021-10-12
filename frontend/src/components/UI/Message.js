import { Alert } from 'react-bootstrap';

const Message = ({ variant, text, children, className }) => {
  return (
    <Alert variant={variant} className={className}>
      {text} {children && children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
