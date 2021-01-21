import './App.css';
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadUser } from './actions/auth';
import Landing from './components/layout/Landing';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const App = ({ auth: { isAuthenticated }, loadUser }) => {
  const location = useLocation();
  useEffect(() => {
    loadUser(location.hash.slice(1));
  }, [loadUser, location.hash]);
  return (
    <Fragment>
      <Landing isAuthenticated={isAuthenticated} />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
