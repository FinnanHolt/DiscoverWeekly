const express = require('express');
const router = express.Router();
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
var SpotifyWebApi = require('spotify-web-api-node');
const isLoggedIn = require('../Middleware/auth');
const User = require('../models/User');
const cron = require('node-cron');
const moment = require('moment');

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
    const userData = await User.findOne({ username: user.body.id });
    res.send(userData.playlists);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

updatePlaylists = async () => {
  try {
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
  } catch (error) {
    console.log('No playlist');
  }
};

updatePlaylist = async accessToken => {
  try {
    spotifyApi.setAccessToken(accessToken);
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
    let currentDate = moment(new Date()).format('DD/MM/YYYY');
    let user = await User.findOneAndUpdate(
      { username: userData.body.id },
      {
        $push: {
          playlists: {
            id: playlistId,
            name: playlistName + ' - ' + currentDate,
            url: playlistUrl,
            songs: songs,
          },
        },
      }
    );

    await user.save();
  } catch (err) {
    console.log('failed');
  }
};
//  */1 * * * * *
// * 12 * * 1
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
