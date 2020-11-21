import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const PrivateRoute = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;
  const { component: Component, mode, x, ...rest } = props;
  console.log('rest', { ...rest });
  console.log('mode', mode);
  console.log('x', x);

  return (
    <Route
      // pass the rest of the props
      {...rest}
      render={props =>
        // if not authenticated when loaded, redirect to login page
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          // if authenticated, load the protected component
          <div>
            {console.log('private route', props)}
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

export default PrivateRoute;
