const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required:false }],
  },
  {
    timestamps: true,
  },
);

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
