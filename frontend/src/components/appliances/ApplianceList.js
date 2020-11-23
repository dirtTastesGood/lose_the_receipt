import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../layout/Pagination';

import ApplianceItem from './ApplianceItem';
import ApplianceForm from './ApplianceForm';
import Spinner from '../layout/Spinner';

import ApplianceContext from '../../context/appliances/applianceContext';

import PaginationContext from '../../context/pagination/paginationContext';

const ApplianceList = () => {
  const applianceContext = useContext(ApplianceContext);
  let { loading, toggleForm, appliances } = applianceContext;

  let paginationContext = useContext(PaginationContext);
  const {
    totalPages,
    nextPageUrl,
    prevPageUrl,
    page,
    perPage,
    updatePagination,
  } = paginationContext;

  useEffect(() => {
    updatePagination();
  }, []);

  return (
    <div className='text-center py-2'>
      {loading && totalPages !== null ? (
        <div className='justify-self-center'>
          <Spinner />
        </div>
      ) : appliances && appliances.length > 0 ? (
        <Fragment>
          {totalPages === null ? (
            <Spinner />
          ) : (
            <Pagination
              page={page}
              perPage={perPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              prevPageUrl={prevPageUrl}
            />
          )}
          <div className='collapse py-5' id='form-collapse'>
            <ApplianceForm toggleForm={toggleForm} />
          </div>
          <div className='container-fluid container-lg mt-3'>
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
            <Link to='/appliances/add'>
              <button className='btn btn bg-warning mx-3' title='add appliance'>
                <span className='font-weight-bold' alt='add appliance'>
                  + add
                </span>
              </button>
            </Link>
          </h1>
        </Fragment>
      )}
    </div>
  );
};

export default ApplianceList;
