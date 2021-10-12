import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default AuthRoute;
