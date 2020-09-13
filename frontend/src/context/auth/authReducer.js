import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_TOKEN_PAIR,
  REFRESH_TOKEN,
  LOGOUT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload, // token
        isAuthenticated: true,
        loading: false,
      };
  }
};
