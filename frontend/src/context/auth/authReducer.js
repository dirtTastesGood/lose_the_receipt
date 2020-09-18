import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_TOKEN_PAIR,
  REFRESH_ACCESS_TOKEN,
  LOGOUT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.access_token,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
  }
};
