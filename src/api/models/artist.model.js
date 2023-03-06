const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    company: { type: String, required: true, trim: true },
    fanclub: { type: String, required: false, trim: true },
    members: { type: Array, maxLength: 20, required: true, trim: true },
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  },
  {
    timestamps: true,
  },
);

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
