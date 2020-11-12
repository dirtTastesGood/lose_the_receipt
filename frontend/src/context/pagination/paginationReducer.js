import { UPDATE_PAGINATION, CHANGE_PAGE } from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case UPDATE_PAGINATION:
      let { bottom, top, pageRange, newTotal } = action.payload;
      return {
        ...state,
        topPage: top,
        bottomPage: bottom,
        pageRange: pageRange,
        totalPages: newTotal,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: parseInt(action.payload),
      };
  }
};
