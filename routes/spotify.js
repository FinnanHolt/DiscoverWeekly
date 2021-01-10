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

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  accessToken: _testSpotifyAccessToken,
  refreshToken: _testSpotifyRefreshToken,
  clientId: clientId,
  clientSecret: clientSecret,
});

router.get('/playlist/', async (req, res) => {
  try {
    const playlists = await spotifyApi.getPlaylist(_testSpotifyPlaylistId);
    res.send(playlists);
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
