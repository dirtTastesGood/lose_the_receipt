import {
  GET_APPLIANCES_SUCCESS,
  GET_APPLIANCES_FAIL,
  TOGGLE_APPLIANCE_FORM,
  GET_APPLIANCE_SUCCESS,
  GET_APPLIANCE_FAIL,
  SET_CURRENT_APPLIANCE,
  CLEAR_CURRENT_APPLIANCE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_APPLIANCES_SUCCESS:
      return {
        ...state,
        appliances: action.payload.appliances,
        loading: false,
      };
    case GET_APPLIANCES_FAIL:
      return {
        ...state,
        appliances: [],
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
