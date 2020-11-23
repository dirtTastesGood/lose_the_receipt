import React, { useReducer } from 'react';

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
    totalPages: 0,
    bottomPage: 1,
    topPage: 5,
    pageRange: [],
    prevPageUrl: null,
    nextPageUrl: null,
  };

  const [state, dispatch] = useReducer(paginationReducer, initialState);

  // destructure state
  const { page, numOfButtons } = state;

  const updatePagination = newTotal => {
    let bottom, top;

    if (page <= numOfButtons / 2 + 1) {
      bottom = 1;
    } else if (page > newTotal - numOfButtons / 2) {
      bottom = newTotal - (numOfButtons - 1);
    } else {
      bottom = page - Math.floor(numOfButtons / 2);
    }

    if (bottom + (numOfButtons - 1) < newTotal) {
      top = bottom + (numOfButtons - 1);
    } else {
      top = newTotal;
    }

    if (newTotal < numOfButtons) {
      top = newTotal;
    }

    let pageRange = range(bottom, top);

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
