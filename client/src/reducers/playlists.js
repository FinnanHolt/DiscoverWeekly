import { GET_PLAYLISTS } from '../actions/types';

const initialState = {
  playlists: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: payload,
        loading: false,
      };
    default:
      return state;
  }
}
