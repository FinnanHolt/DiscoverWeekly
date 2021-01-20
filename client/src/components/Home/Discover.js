import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists } from '../../actions/playlists';
import { PlaylistItem } from './PlaylistItem';

const Discover = ({
  user: { token },
  playlists: { playlists, loading },
  getPlaylists,
}) => {
  useEffect(() => {
    getPlaylists(token);
  }, [token, getPlaylists]);
  return (
    <div className='container'>
      {/* Implement Spinner */}
      {playlists.slice(0, 5).map(playlist => (
        <PlaylistItem key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

Discover.propTypes = {
  user: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  playlists: state.playlists,
});

export default connect(mapStateToProps, { getPlaylists })(Discover);
