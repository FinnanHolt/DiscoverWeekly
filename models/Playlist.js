const mongoose = require('mongoose');
const Song = require('./Song').schema;
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  songs: {
    type: [Song],
    required: true,
  },
});

module.exports = Playlist = mongoose.model('playlist', PlaylistSchema);
