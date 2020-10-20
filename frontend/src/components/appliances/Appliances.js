import React, { Fragment, useContext, useEffect } from 'react';
import './scss/appliances.scss';
import ApplianceContext from '../../context/appliances/applianceContext';
import AuthContext from '../../context/auth/authContext';
import $ from 'jquery';

import Spinner from '../layout/Spinner';
import ApplianceForm from './ApplianceForm';
const Appliances = () => {
  const applianceContext = useContext(ApplianceContext);
  const authContext = useContext(AuthContext);

  const { appliances, createAppliance, getAppliances } = applianceContext;
  const { user, loading, accessToken } = authContext;
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
    getAppliances();
  }, [user, accessToken]);

  return (
    <div className='container my-5 p-4' id='appliance-list'>
      {!loading ? (
        <Fragment>
          <h1 className='text-center text-lg-left'>
            My Appliances
            <button
              className='btn btn-sm bg-warning mx-3'
              data-toggle='tooltip'
              data-placement='right'
              title='add appliance'
            >
              <span
                className='text-bold'
                aria-label='add appliance'
                alt='add appliance'
              >
                + new
              </span>
            </button>
          </h1>

          {appliances && appliances.length > 0 ? (
            <div>
              {appliances.map(appliance => (
                <div>
                  {appliance.brand} {appliance.appliance_type}
                </div>
              ))}
            </div>
          ) : (
            <Fragment>
              <h3 className='text-center text-lg-left'>No appliances found</h3>
              <h5 className='text-center text-lg-left'>
                Add an appliance to get started
              </h5>
            </Fragment>
          )}
          <ApplianceForm />
        </Fragment>
      ) : (
        <div className='row'>
          <div className='col col-6 offset-3 text-center mt-4'>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appliances;
