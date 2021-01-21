const express = require('express');
const router = express.Router();
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const _testSpotifyUsername = config.get('_testSpotifyUsername');
var SpotifyWebApi = require('spotify-web-api-node');
const isLoggedIn = require('../Middleware/auth');

var redirectUri = 'http://localhost:8000/auth/spotify/callback';

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

router.get('/playlist/:token', isLoggedIn, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.user.accessToken);
    const user = await spotifyApi.getMe();

    const data = await spotifyApi.getUserPlaylists(user.body.id);
    const playlists = data.body.items;

    res.send(playlists);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// router.get('/refreshAccessToken', async (req, res) => {
//   try {
//     const data = await spotifyApi.refreshAccessToken();
//     await User.findOneAndUpdate(
//       { username: _testSpotifyUsername },
//       { accessToken: data.body.access_token }
//     );
//     res.send(data.body.access_token);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
