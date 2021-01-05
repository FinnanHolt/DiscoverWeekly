const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport');
const isLoggedIn = require('./Middleware/auth');
const connectDB = require('./config/db');
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const _testSpotifyAccessToken = config.get('_testSpotifyAccessToken');
const _testSpotifyRefreshToken = config.get('_testSpotifyRefreshToken');
const _testSpotifyPlaylistId = config.get('_testSpotifyPlaylistId');
const _testSpotifyUsername = config.get('_testSpotifyUsername');

connectDB();
app.use(
  cookieSession({
    name: 'spotify-auth-session',
    keys: ['key1', 'key2'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', isLoggedIn, async (req, res) => {
  res.send(`Hello world ${req.user.displayName}`);
});
app.get('/auth/error', (req, res) => res.send('Unknown Error'));
app.get('/auth/spotify', passport.authenticate('spotify'));
app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.send({ isAutheticated: true });
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  accessToken: _testSpotifyAccessToken,
  refreshToken: _testSpotifyRefreshToken,
  clientId: clientId,
  clientSecret: clientSecret,
});

app.get('/playlist/', async (req, res) => {
  try {
    const playlists = await spotifyApi.getPlaylist(_testSpotifyPlaylistId);
    res.send(playlists);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/refreshAccessToken', async (req, res) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    await User.findOneAndUpdate(
      { username: _testSpotifyUsername },
      { accessToken: data.body.access_token }
    );
    res.send(data.body.access_token);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.listen(8000, () => {
  console.log('Server is up and running at the port 8000');
});
