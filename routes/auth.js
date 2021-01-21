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

var scopes = ['playlist-read-private'],
  state = 'some-state-of-my-choice',
  redirectUri = 'http://localhost:8000/auth/spotify/callback';

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

router.get('/', (req, res) => {
  try {
    const urlAuthorise = spotifyApi.createAuthorizeURL(scopes, state);
    res.redirect(urlAuthorise);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/spotify/callback', async (req, res) => {
  try {
    var authCode = req.query.code;
    const data = await spotifyApi.authorizationCodeGrant(authCode);

    accessToken = data.body['access_token'];
    refreshToken = data.body['refresh_token'];
    expiresIn = data.body['expires_in'];

    spotifyApi.setAccessToken(accessToken);
    let username;
    try {
      const userData = await spotifyApi.getMe();
      username = userData.body.id;
    } catch (error) {
      res.status(500).send('Problem connecting to Spotify API');
    }

    addUserToDb(username, accessToken, refreshToken, authCode);

    const payload = {
      accessToken: accessToken,
      authCode: authCode,
    };

    jwt.sign(payload, jwtSecret, { expiresIn: expiresIn }, (err, token) => {
      if (err) throw err;
      res.redirect('http://localhost:3000/#' + token);
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
});

async function addUserToDb(username, accessToken, refreshToken, authCode) {
  try {
    let user = await User.findOne({ username: username });

    if (user) {
      await User.findOneAndUpdate(
        { username: username },
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
          authCode: authCode,
        }
      );
    } else {
      user = new User({
        username,
        accessToken,
        refreshToken,
        authCode,
      });

      await user.save();
    }
  } catch (error) {
    res.status(500).send('Problem inserting into database');
  }
}

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
