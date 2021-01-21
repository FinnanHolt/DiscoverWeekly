import React from 'react';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import { HomePage } from '../Home/HomePage';
import Discover from '../Home/Discover';

const Landing = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <Discover /> : <HomePage />}
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Landing;
