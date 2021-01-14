import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';

const Landing = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default connect(null, null)(Landing);
