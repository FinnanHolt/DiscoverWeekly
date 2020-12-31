const mongoose = require('mongoose');
const Song = require('./Song');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songs: {
    type: [Song],
    required: true,
    unique: true,
  },
});

module.exports = Playlist = mongoose.model('playlist', PlaylistSchema);
