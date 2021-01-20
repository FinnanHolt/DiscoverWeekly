const express = require('express');
const router = express.Router();
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const _testSpotifyAccessToken = config.get('_testSpotifyAccessToken');
const _testSpotifyRefreshToken = config.get('_testSpotifyRefreshToken');
const _testSpotifyPlaylistId = config.get('_testSpotifyPlaylistId');
const _testSpotifyUsername = config.get('_testSpotifyUsername');
var SpotifyWebApi = require('spotify-web-api-node');

router.get('/playlist', async (req, res) => {
  var scopes = ['user-read-private'],
    state = 'some-state-of-my-choice',
    redirectUri = 'http://localhost:8000/spotify/playlist2';

  var spotifyApi = new SpotifyWebApi({
    accessToken:
      'BQDWRC3YT-NAqFeVi5dkTwvM_YnmbYXWa7WYbMUnoc2G0KEa7cg6CI317qMYJN6ses3TTcYDYJKTrenZxdZBJl5hKkwRxWge7sTqfjZI-hj0iy1Yl59cTzWEDPxv-7mz9HTReRkBxer1CCQ0',
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
  });
  try {
    const code = await spotifyApi.createAuthorizeURL(scopes, state);
    res.redirect(code);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/refreshAccessToken', async (req, res) => {
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

module.exports = router;
