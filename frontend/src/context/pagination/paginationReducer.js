import { UPDATE_PAGINATION } from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case UPDATE_PAGINATION:
      let { bottom, top, pageRange, newTotal } = action.payload;

      console.log('payload:', action.payload);

      return {
        ...state,
        topPage: top,
        bottomPage: bottom,
        pageRange: pageRange,
        totalPages: newTotal,
      };
  }
};
