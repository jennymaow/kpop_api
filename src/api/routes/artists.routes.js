const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const ArtistsRoutes = express.Router();

const {
  createArtist,
  getAllArtists,
  getArtistById,
  getArtistByName,
  deleteArtist,
  updateArtistAdd,
  updateArtistDelete,
} = require('../controllers/artists.controllers');

ArtistsRoutes.get('/', getAllArtists);
ArtistsRoutes.get('/:id', getArtistById);
ArtistsRoutes.get('/name/:name', getArtistByName);
ArtistsRoutes.post('/', upload.single('image'), createArtist);
ArtistsRoutes.delete('/:id', deleteArtist);
ArtistsRoutes.put('/:id', upload.single('image'), updateArtistAdd);
ArtistsRoutes.patch('/:id', upload.single('image'), updateArtistDelete);

module.exports = ArtistsRoutes;
