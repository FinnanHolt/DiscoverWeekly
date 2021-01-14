import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import { HomePage } from '../Home/HomePage';
import Discover from '../Home/Discover';

const Landing = ({ auth: { isAuthenticated } }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <Discover /> : <HomePage />}
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Landing);
