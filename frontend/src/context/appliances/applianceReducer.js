import { GET_APPLIANCES_SUCCESS, GET_APPLIANCES_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_APPLIANCES_SUCCESS:
      return {
        ...state,
        appliances: action.payload.appliances,
      };
    case GET_APPLIANCES_FAIL:
      return {
        ...state,
        appliances: []
      }
  }
};
