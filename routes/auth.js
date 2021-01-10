const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('../passport');

router.use(
  cookieSession({
    name: 'spotify-auth-session',
    keys: ['key1', 'key2'],
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get('/error', (req, res) => res.send('Unknown Error'));
router.get('/spotify', passport.authenticate('spotify'));
router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('http://localhost:3000');
  }
);

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;
