import { USER_LOGIN, USER_LOADED, LOGOUT, AUTH_ERROR } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
    case USER_LOADED:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
