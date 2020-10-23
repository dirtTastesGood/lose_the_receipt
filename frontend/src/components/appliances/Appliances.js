import React, { Fragment, useContext, useEffect, useState } from 'react';
import './scss/appliances.scss';
import ApplianceContext from '../../context/appliances/applianceContext';
import AuthContext from '../../context/auth/authContext';
import $ from 'jquery';

import Spinner from '../layout/Spinner';
import ApplianceForm from './ApplianceForm';
import ApplianceList from './ApplianceList';


const Appliances = () => {
  const applianceContext = useContext(ApplianceContext);
  const authContext = useContext(AuthContext);

  const { appliances, getAppliances, current } = applianceContext;
  const { user, loading, accessToken } = authContext;

  useEffect(()=> {$('[data-toggle="tooltip"]').tooltip()}, [])

  useEffect(() => {
   
    getAppliances();

  }, [user, accessToken]);
  

  return (
    <div className='container my-5 p-0 pb-3' id='appliance-list'>
      {!loading ? (
        <Fragment>
          <ApplianceList appliances={appliances}/>
        </Fragment>
      ) : (
        <div className='row my-0'>
          <div className='col col-6 offset-3 text-center'>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appliances;
