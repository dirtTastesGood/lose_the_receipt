import { GET_APPLIANCES_SUCCESS, GET_APPLIANCES_FAIL, TOGGLE_APPLIANCE_FORM, SET_CURRENT_APPLIANCE } from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_APPLIANCES_SUCCESS:
      return {
        ...state,
        appliances: action.payload.appliances,
        loading: false
      };
    case GET_APPLIANCES_FAIL:
      return {
        ...state,
        appliances: [],
        loading: false
      };
    case TOGGLE_APPLIANCE_FORM:
      return {
        ...state,
        showForm:!state.showForm
      }
    case SET_CURRENT_APPLIANCE:
      return {
        ...state,
        current: action.payload
      }
  }
};
