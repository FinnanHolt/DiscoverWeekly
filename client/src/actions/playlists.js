import axios from 'axios';
import { GET_PLAYLISTS } from './types';

//Get Playlists
export const getPlaylists = token => async dispatch => {
  const res = await axios.get(
    `http://localhost:8000/spotify/playlist/${token}`
  );
  dispatch({
    type: GET_PLAYLISTS,
    payload: res.data,
  });
};
