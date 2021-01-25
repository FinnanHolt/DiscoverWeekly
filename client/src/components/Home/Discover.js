import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists } from '../../actions/playlists';
import { PlaylistItem } from './PlaylistItem';

const Discover = ({
  token,
  playlists: { playlists, loading },
  getPlaylists,
}) => {
  useEffect(() => {
    getPlaylists(token);
  }, [token, getPlaylists]);
  return (
    <div className='container'>
      {playlists.slice(0, 5).map(playlist => (
        <PlaylistItem key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

Discover.propTypes = {
  token: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.user.token,
  playlists: state.playlists,
});

export default connect(mapStateToProps, { getPlaylists })(Discover);
