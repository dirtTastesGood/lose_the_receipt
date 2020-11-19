import {
  GET_APPLIANCES_SUCCESS,
  GET_APPLIANCES_FAIL,
  TOGGLE_APPLIANCE_FORM,
  GET_APPLIANCE_SUCCESS,
  GET_APPLIANCE_FAIL,
  SET_CURRENT_APPLIANCE,
  CLEAR_CURRENT_APPLIANCE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_APPLIANCES_SUCCESS:
      const { results, previous, next, count } = action.payload;
      return {
        ...state,
        appliances: results,
        prevPageUrl: previous,
        nextPageUrl: next,
        applianceCount: count,
        totalPages: Math.ceil(count / state.perPage),
        loading: false,
      };
    case GET_APPLIANCES_FAIL:
      return {
        ...state,
        appliances: [],
        prevPageUrl: null,
        nextPageUrl: null,
        applianceCount: null,
        totalPages: 1,
        loading: false,
      };
    case TOGGLE_APPLIANCE_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case GET_APPLIANCE_SUCCESS:
    case SET_CURRENT_APPLIANCE:
      return {
        ...state,
        current: action.payload,
      };
    case GET_APPLIANCE_FAIL:
    case CLEAR_CURRENT_APPLIANCE:
      return {
        ...state,
        current: null,
      };
    case SET_CURRENT_APPLIANCE:
      return {
        ...state,
        current: action.payload,
      };
  }
};
