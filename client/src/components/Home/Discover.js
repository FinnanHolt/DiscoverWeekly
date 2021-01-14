import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Discover = ({ user: { token } }) => {
  return <div>discover</div>;
};

Discover.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Discover);
