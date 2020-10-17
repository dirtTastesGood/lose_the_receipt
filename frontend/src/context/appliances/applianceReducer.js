import { GET_APPLIANCES } from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_APPLIANCES:
      return {
        ...state,
        appliances: action.payload.appliances,
      };
  }
};
