import React, { Fragment, useContext, useEffect } from 'react';

import ApplianceContext from '../../context/appliances/applianceContext';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../layout/Spinner';
const Appliances = () => {
  const applianceContext = useContext(ApplianceContext);
  const authContext = useContext(AuthContext);

  const { appliances, getAppliances } = applianceContext;
  const { user, loading } = authContext;

  useEffect(() => {
    getAppliances();
  }, [user]);

  return (
    <div>
      {!loading ? (
        <Fragment>
          <h1>Appliances</h1>
          <p>{user && user.email}</p>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Appliances;
