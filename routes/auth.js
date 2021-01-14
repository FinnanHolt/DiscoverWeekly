const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/error', (req, res) => res.send('Unknown Error'));
router.get('/spotify', passport.authenticate('spotify'));
router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/error',
  })
);

router.get('/login/success', async (req, res) => {
  if (req.user) {
    const token = await getToken(req.user.username);
    res.json({
      success: true,
      message: 'User has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
      token: token,
    });
  }
});

async function getToken(id) {
  const token = await User.findOne({ username: id }, { accessToken: 1 });
  return token.accessToken;
}

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.json({
    success: true,
    message: 'User has successfully logged out',
  });
});

module.exports = router;
