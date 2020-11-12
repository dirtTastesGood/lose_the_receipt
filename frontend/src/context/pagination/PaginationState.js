import React, { useReducer, useContext } from 'react';

import axios from 'axios';
import range from '../../utils/range';

import PaginationContext from './paginationContext';
import paginationReducer from './paginationReducer';

import { UPDATE_PAGINATION } from '../types';

const PaginationState = props => {
  const initialState = {
    // pagination
    page: 1,
    perPage: 4,
    numOfButtons: 5,
    totalPages: 5,
    bottomPage: 1,
    topPage: 5,
    pageRange: [],
    prevPageUrl: null,
    nextPageUrl: null,
  };

  const paginationContext = useContext(PaginationContext);
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  // destructure state
  const { page, bottomPage, topPage, numOfButtons } = state;

  const updatePagination = newTotal => {
    let bottom = page - 2 >= 1 ? page - 2 : 1;
    let top = page + 2 < newTotal ? bottomPage + (numOfButtons - 1) : newTotal;
    let pageRange = range(bottom, top);

    dispatch({
      type: UPDATE_PAGINATION,
      payload: { bottom, top, pageRange, newTotal },
    });
  };

  const changePage = e => console.log(e.target.id);

  return (
    <PaginationContext.Provider
      value={{
        // provide pagination data to app
        page: state.page,
        perPage: state.perPage,
        numOfButtons: state.numOfButtons,
        totalPages: state.totalPages,
        bottomPage: state.bottomPage,
        topPage: state.topPage,
        pageRange: state.pageRange,
        prevPageUrl: state.prevPageUrl,
        nextPageUrl: state.nextPageUrl,
        updatePagination,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};

export default PaginationState;
