import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { page, perPage, totalPages, nextPageUrl, prevPageUrl } = props;

  return (
    <div>
      page: {page}
      perPage: {perPage}
      total: {totalPages}
      next: {nextPageUrl}
      prev: {prevPageUrl}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  prevPageUrl: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string.isRequired,
};

export default Pagination;
