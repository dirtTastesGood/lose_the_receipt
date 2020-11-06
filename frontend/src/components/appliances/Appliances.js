import React, { Fragment, useContext, useEffect, useState } from 'react';
import './scss/appliances.scss';
import ApplianceContext from '../../context/appliances/applianceContext';
import AuthContext from '../../context/auth/authContext';
import $ from 'jquery';

import Spinner from '../layout/Spinner';
import ApplianceList from './ApplianceList';

const Appliances = () => {
  const applianceContext = useContext(ApplianceContext);
  const authContext = useContext(AuthContext);

  const { getAppliances } = applianceContext;
  const { loading } = authContext;

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  useEffect(() => {
    getAppliances();
  }, []);

  return (
    <div className='container-fluid my-5' id='appliance-list'>
      {!loading ? (
        <Fragment>
          <ApplianceList />
        </Fragment>
      ) : (
        <div className='row my-5'>
          <div className='col col-6 offset-3 text-center'>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appliances;
