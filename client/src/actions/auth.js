import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { USER_LOADED, AUTH_ERROR, LOGOUT } from './types';

//Load User
export const loadUser = urlToken => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (urlToken) {
      setAuthToken(urlToken);
    }
    const res = await axios.get('http://localhost:8000/auth/login/success', {
      withCredentials: true,
    });
    const token = urlToken ? urlToken : localStorage.token;
    dispatch({
      type: USER_LOADED,
      payload: { ...res.data, token },
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Logout
export const logout = () => async dispatch => {
  await axios.get('http://localhost:8000/auth/logout');
  dispatch({
    type: LOGOUT,
  });
};
