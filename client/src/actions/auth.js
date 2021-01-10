import axios from 'axios';
import { USER_LOADED, AUTH_ERROR } from './types';

//Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:8000/auth/login/success', {
      withCredentials: true,
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
