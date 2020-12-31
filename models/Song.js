const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = Song = mongoose.model('song', SongSchema);
