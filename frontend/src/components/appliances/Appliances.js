import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './scss/appliances.scss';
import ApplianceContext from '../../context/appliances/applianceContext';
import AuthContext from '../../context/auth/authContext';
import PaginationContext from '../../context/pagination/paginationContext';
import $ from 'jquery';

import Spinner from '../layout/Spinner';
import ApplianceList from './ApplianceList';

const Appliances = () => {
  const applianceContext = useContext(ApplianceContext);
  const { getAppliances } = applianceContext;

  const authContext = useContext(AuthContext);
  const { loading } = authContext;

  const paginationContext = useContext(PaginationContext);
  const { page } = paginationContext;

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  useEffect(() => {
    getAppliances();
  }, [page]);

  return (
    <div className='container-fluid my-5' id='appliance-list'>
      {!loading ? (
        <Fragment>
          <h1 className='text-center text-lg-left'>
            <Link to='/appliances/add'>
              <button className='btn btn bg-warning mx-3' title='add appliance'>
                <span className='font-weight-bold' alt='add appliance'>
                  + add
                </span>
              </button>
            </Link>
          </h1>
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
