import React, { useContext, useEffect } from 'react';
import './scss/pagination.scss';
import PaginationContext from '../../context/pagination/paginationContext';

const Pagination = () => {
  const paginationContext = useContext(PaginationContext);

  const { page, pageRange, updatePagination, changePage } = paginationContext;

  useEffect(() => {
    updatePagination();
  }, []);

  return (
    <div className='row' id='pagination'>
      <div className='col col-4 offset-4 col-lg-2 offset-lg-5 d-flex justify-content-center'>
        {pageRange.map((pageNum, i) => (
          <span
            className={'pageNum mx-2 ' + (page === pageNum ? 'active' : '')}
            id={pageNum}
            onClick={changePage}
            key={i}
          >
            {pageNum}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
