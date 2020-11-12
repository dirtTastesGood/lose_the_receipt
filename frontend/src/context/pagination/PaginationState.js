import React, { useReducer, useContext } from 'react';

import axios from 'axios';
import range from '../../utils/range';

import PaginationContext from './paginationContext';
import paginationReducer from './paginationReducer';

import { UPDATE_PAGINATION, CHANGE_PAGE } from '../types';

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

    console.log(page, bottom, top, pageRange);

    dispatch({
      type: UPDATE_PAGINATION,
      payload: { bottom, top, pageRange, newTotal },
    });
  };

  // change page to the number id of the target button
  const changePage = e => {
    dispatch({ type: CHANGE_PAGE, payload: e.target.id });
  };

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
        changePage,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};

export default PaginationState;
