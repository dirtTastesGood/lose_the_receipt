import React, { Fragment, useEffect, useContext } from 'react';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import Pagination from '../layout/Pagination';

import ApplianceItem from './ApplianceItem';
import ApplianceForm from './ApplianceForm';
import Spinner from '../layout/Spinner';

import ApplianceContext from '../../context/appliances/applianceContext';

const ApplianceList = () => {
  const applianceContext = useContext(ApplianceContext);
  let {
    loading,
    showForm,
    toggleForm,
    page,
    perPage,
    appliances,
    totalPages,
    nextPageUrl,
    prevPageUrl,
  } = applianceContext;

  let { path } = useRouteMatch();

  return (
    <div className='text-center'>
      {loading ? (
        <div className='justify-self-center'>
          <Spinner />
        </div>
      ) : appliances && appliances.length > 0 ? (
        <Fragment>
          <h1 className='text-center text-lg-left'>
            <button
              className='btn btn bg-warning mx-3'
              data-toggle='collapse'
              data-target='#form-collapse'
              data-placement='right'
              href={`${path}/new`}
              title='add appliance'
              onClick={toggleForm}
            >
              <span
                className='font-weight-bold'
                aria-label='add appliance'
                alt='add appliance'
              >
                {showForm ? '- close' : '+ new'}
              </span>
            </button>
          </h1>
          <Pagination
            page={page}
            perPage={perPage}
            totalPages={totalPages}
            nextPageUrl={nextPageUrl}
            prevPageUrl={prevPageUrl}
          />
          <div className='collapse py-5' id='form-collapse'>
            <ApplianceForm toggleForm={toggleForm} />
          </div>
          <div className='container-fluid container-lg'>
            <div className='row'>
              {appliances.map((appliance, i) => (
                <div className='col col-12 col-lg-6 my-3 px-lg-3' key={i}>
                  <ApplianceItem appliance={appliance} index={i} />
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className='text-center text-lg-left'>No appliances found</h3>
          <h5 className='text-center text-lg-left'>
            Add an appliance to get started
          </h5>

          <h1 className='text-center text-lg-left'>
            <button
              className='btn btn bg-warning mx-3'
              data-toggle='collapse'
              data-target='#form-collapse'
              data-placement='right'
              title='add appliance'
              onClick={toggleForm}
            >
              <span
                className='font-weight-bold'
                aria-label='add appliance'
                alt='add appliance'
              >
                {showForm ? '- close' : '+ new'}
              </span>
            </button>
          </h1>

          <div className='collapse py-5' id='form-collapse'>
            <ApplianceForm toggleForm={toggleForm} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ApplianceList;
