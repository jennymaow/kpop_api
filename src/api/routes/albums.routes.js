const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const AlbumsRoutes = express.Router();

const {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  getAlbumByName,
  deleteAlbum,
  updateAlbumAdd,
  updateAlbumDelete,
} = require('../controllers/album.controllers');

AlbumsRoutes.get('/', getAllAlbums);
AlbumsRoutes.get('/:id', getAlbumById);
AlbumsRoutes.get('/name/:name', getAlbumByName);
AlbumsRoutes.post('/', upload.single('image'), createAlbum);
AlbumsRoutes.delete('/:id', deleteAlbum);
AlbumsRoutes.put('/:id', upload.single('image'), updateAlbumAdd);
AlbumsRoutes.patch('/:id', upload.single('image'), updateAlbumDelete);

module.exports = AlbumsRoutes;
