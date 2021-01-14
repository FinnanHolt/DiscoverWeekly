import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    backgroundColor: 'black',
  },

  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.navbar}>
          <Typography variant='h6' className={classes.title}>
            Disovered
          </Typography>
          {isAuthenticated ? (
            <Button
              color='inherit'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color='inherit'
              href={process.env.REACT_APP_DEV_SERVER + '/auth/spotify'}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(null, { logout })(Navbar);
