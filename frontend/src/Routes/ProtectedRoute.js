import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  console.log('ProtectedRoute: ',location)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
