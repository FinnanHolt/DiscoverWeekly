const express = require('express');
const router = express.Router();
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const _testSpotifyUsername = config.get('_testSpotifyUsername');
var SpotifyWebApi = require('spotify-web-api-node');
const isLoggedIn = require('../Middleware/auth');
const User = require('../models/User');
const cron = require('node-cron');

var redirectUri = 'http://localhost:8000/auth/spotify/callback';

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

updatePlaylists = async () => {
  await User.find({}, 'accessToken', function (err, users) {
    if (err) {
      console.log(err);
    } else {
      let accessTokens = users.map(doc => {
        return doc.accessToken;
      });
      accessTokens.forEach(a => {
        console.log(a);
        updatePlaylist(a);
      });
    }
  });
};

updatePlaylist = async req => {
  try {
    spotifyApi.setAccessToken(req.user.accessToken);
    const userData = await spotifyApi.getMe();
    const playlistData = await spotifyApi.getUserPlaylists(userData.body.id, {
      limit: 50,
    });
    playlistData.body.items.filter(d => d.name == 'Discover Weekly');
    const playlist = playlistData.body.items.filter(
      d => d.name == 'Discover Weekly'
    )[0];

    const { id: playlistId, name: playlistName, uri: playlistUrl } = playlist;
    const songData = await spotifyApi.getPlaylist(playlistId);

    songs = songData.body.tracks.items.map(song => {
      let {
        track: { id, name, uri: url },
      } = song;

      return {
        id,
        name,
        url,
      };
    });
    let user = await User.findOneAndUpdate(
      { username: userData.body.id, 'playlists.id': { $ne: playlistId } },

      {
        $push: {
          playlists: {
            id: playlistId,
            name: playlistName,
            url: playlistUrl,
            songs: songs,
          },
        },
      }
    );

    await user.save();

    res.send([]);
  } catch (err) {
    console.log('failed');
  }
};

cron.schedule('* 12 * * 1', updatePlaylists);

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
