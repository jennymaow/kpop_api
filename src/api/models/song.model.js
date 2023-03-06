const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;
