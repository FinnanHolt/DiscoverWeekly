const mongoose = require('mongoose');
const Playlist = require('./Playlist').schema;
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  playlists: {
    type: [Playlist],
    required: true,
  },
});

module.exports = User = mongoose.model('user', UsersSchema);
