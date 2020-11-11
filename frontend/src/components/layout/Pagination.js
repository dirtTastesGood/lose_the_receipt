import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./scss/pagination.scss";
import range from "../../utils/range";

const Pagination = (props) => {
  const { page, perPage, totalPages, nextPageUrl, prevPageUrl } = props;

  const [config, setConfig] = useState({
    bottom: 1,
    top: 5,
    numOfPages: 5,
    pageRange: [],
  });
  let { bottom, top, numOfPages, pageRange } = config;

  // get bottom limit of range
  const getBottom = () => (page - 2 >= 1 ? page - 2 : 1);

  // get top limit of range
  const getTop = (n = 4) =>
    page + 2 < totalPages ? bottom + (numOfPages - 1) : totalPages;

  const changePage = (e) => console.log(e.target.id);

  return (
    <div className="row" id="pagination">
      <h1></h1>
      <div className="col col-6 offset-3 d-flex justify-content-around">
        {pageRange.map((pageNum, i) => (
          <span
            className={"pageNum " + (page === pageNum ? "active" : "")}
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

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  prevPageUrl: PropTypes.string,
  nextPageUrl: PropTypes.string,
};

export default Pagination;
