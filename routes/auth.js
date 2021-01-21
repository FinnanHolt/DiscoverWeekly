const express = require('express');
const router = express.Router();
const User = require('../models/User');
var SpotifyWebApi = require('spotify-web-api-node');
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const jwtSecret = config.get('jwtSecret');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../Middleware/auth');

router.get('/', (req, res) => {
  var scopes = ['user-read-private'],
    state = 'isAuthenticated',
    redirectUri = 'http://localhost:8000/auth/spotify/callback';

  var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
  });
  try {
    const urlAuthorise = spotifyApi.createAuthorizeURL(scopes, state);
    res.redirect(urlAuthorise);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// try {
//   let user = await User.findOne({ username: username });

//   if (user) {
//     await User.findOneAndUpdate(
//       { username: username },
//       { accessToken: accessToken, refreshToken: refreshToken }
//     );
//   } else {
//     user = new User({
//       username,
//       accessToken,
//       refreshToken,
//     });

//     await user.save();
//   }

router.get('/spotify/callback', async (req, res) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'http://localhost:8000/auth/spotify/callback',
  });

  req.sessionKey = 'yes';
  try {
    var code = req.query.code;
    const data = await spotifyApi.authorizationCodeGrant(code);

    token = data.body['access_token'];
    expiresIn = data.body['expires_in'];

    //Put refresh and access tokens in db if user not already there
    console.log('The refresh token is ' + data.body['refresh_token']);

    spotifyApi.setRefreshToken(data.body['refresh_token']);
    //Add payload
    const payload = {
      accessToken: token,
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: expiresIn },
      (err, token) => {
        if (err) throw err;
        res.redirect('http://localhost:3000/#' + token);
      }
    );
  } catch (error) {
    console.log('Something went wrong!', error);
  }
});

router.get('/login/success', isLoggedIn, async (req, res) => {
  try {
    res.json({ isAuthenticated: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.json({
    success: true,
    message: 'User has successfully logged out',
  });
});

module.exports = router;
