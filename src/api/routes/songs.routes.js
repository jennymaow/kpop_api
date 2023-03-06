const express = require('express');

const SongsRoutes = express.Router();

const {
  createSong,
  getAllSongs,
  deleteSong,
  updateSong,
  getSongById,
  getSongByTitle,
} = require('../controllers/songs.controllers');

SongsRoutes.get('/', getAllSongs);
SongsRoutes.get('/:id', getSongById);
SongsRoutes.get('/title/:title', getSongByTitle);
SongsRoutes.post('/', createSong);
SongsRoutes.delete('/:id', deleteSong);
SongsRoutes.put('/:id', updateSong);

module.exports = SongsRoutes;
