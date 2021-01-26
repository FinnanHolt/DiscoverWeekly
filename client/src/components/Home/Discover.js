import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists } from '../../actions/playlists';
import { PlaylistItem } from './PlaylistItem';
import SongTable from './SongTable';

const Discover = ({ token, playlists, getPlaylists }) => {
  const [rowData, setRowData] = useState();

  useEffect(() => {
    getPlaylists(token);
  }, [token, getPlaylists]);
  return (
    <div className='container'>
      {playlists.slice(0, 4).map(playlist => (
        <div
          key={playlist._id}
          onMouseEnter={() => {
            setRowData(playlist);
          }}
        >
          <PlaylistItem playlist={playlist} />
        </div>
      ))}
      {rowData ? (
        <div className='container secondary'>
          <SongTable songs={rowData.songs} />
        </div>
      ) : null}
    </div>
  );
};

// onMouseEnter={key => {
//   console.log('wwwww');
//   setRowData(playlist.map(playlist => key === playlist._id));
// }}

Discover.propTypes = {
  token: PropTypes.string.isRequired,
  playlists: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.user.token,
  playlists: state.playlists.playlists,
});

export default connect(mapStateToProps, { getPlaylists })(Discover);
