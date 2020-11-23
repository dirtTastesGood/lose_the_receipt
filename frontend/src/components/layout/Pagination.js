import React, { useContext } from 'react';
import './scss/pagination.scss';
import PaginationContext from '../../context/pagination/paginationContext';

const Pagination = () => {
  const paginationContext = useContext(PaginationContext);

  const {
    page,
    pageRange,
    totalPages,
    numOfButtons,
    changePage,
  } = paginationContext;

  return (
    <div className='row' id='pagination'>
      {pageRange.length > 1 ? (
        <div className='col col-10 offset-1 col-lg-4 offset-lg-4 d-flex justify-content-center'>
          {pageRange.length >= 3 ? (
            <span
              className={
                'pageArrow firstArrow mx-2 ' + (page === 1 ? 'disabled' : '')
              }
              id='1'
              onClick={changePage}
            >
              &laquo;
            </span>
          ) : (
            ''
          )}
          <span
            className={
              'pageArrow prevArrow ml-2 mr-3 ' +
              (page - 1 < 1 ? 'disabled' : '')
            }
            id={page - 1}
            onClick={page - 1 >= 1 ? changePage : null}
          >
            &lsaquo;
          </span>
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

          <span
            className={
              'pageArrow nextArrow ml-3 mr-2 ' +
              (page + 1 > totalPages ? 'disabled' : '')
            }
            id={page + 1}
            onClick={page + 1 <= totalPages ? changePage : null}
          >
            &rsaquo;
          </span>

          {totalPages >= numOfButtons ? (
            <span
              className={
                'pageArrow lastArrow mx-2 ' +
                (page + 1 > totalPages ? 'disabled' : '')
              }
              id={totalPages}
              onClick={changePage}
            >
              &raquo;
            </span>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
