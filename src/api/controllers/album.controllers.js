const Album = require('../models/album.model');

const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllAlbums = async (req, res, next) => {
  try {
    /* const Albums = await Album.find().populate('songs');
    return res.status(200).json(Albums); */
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numAlbums = await Album.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 20;
      let numPages = numAlbums % limit > 0 ? numAlbums / limit + 1 : numAlbums / limit;
      if (page > numPages) {
        page = 1;
      }

      const skip = (page - 1) * 20;

      const allAlbums = await Album.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          total: numAlbums,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/v1/albums?page=${page + 1}&limit=${limit}`
              : null,
          prev: page != 1 ? `/api/v1/albums?page=${page - 1}&limit=${limit}` : null,
        },
        results: allAlbums,
      });
    } else {
      const allAlbums = await Album.find().limit(20).populate('songs');
      const numAlbums = await Album.countDocuments();
      return res.status(200).json({
        info: {
          total: numAlbums,
          page: 1,
          limit: 20,
          next: numAlbums > 20 ? `/api/v1/albums?page=2&limit=20` : null,
          prev: null,
        },
        results: allAlbums,
      });
    }
  } catch (error) {
    return next('Albums not found', error);
  }
};

const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id).populate('songs');
    return res.status(200).json(album);
  } catch (error) {
    return next(error);
  }
};

const getAlbumByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const album = await Album.find({ name: name }).populate('songs');
    return res.status(200).json(album);
  } catch (error) {
    return next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);

    if (album.image) {
      deleteImgCloudinary(album.image);
    }
    return res.status(200).json(album);
  } catch (error) {
    return next('Error deleting album', error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    const newAlbum = new Album({
      ...req.body,
      image: req.file ? req.file.path : 'Image not found',
    });

    const createdAlbum = await newAlbum.save();

    return res.status(201).json(createdAlbum);
  } catch (error) {
    return next('Error creating Album', error);
  }
};

const updateAlbumAdd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedAlbum = new Album(req.body);
    modifiedAlbum._id = id;
    const foundAlbum = await Album.findById(id);

    modifiedAlbum.songs = [...modifiedAlbum.songs, ...foundAlbum.songs];
    const updatedAlbum = await Album.findByIdAndUpdate(id, modifiedAlbum);

    if (req.file) {
      deleteImgCloudinary(updatedAlbum.image);
    }

    if (req.file) {
      modifiedAlbum.image = res.file.path;
    }

    if (!updatedAlbum) {
      return next('Album not found');
    }
    return res.status(200).json(modifiedAlbum);
  } catch (error) {
    return next('Error updating Album', error);
  }
};

const updateAlbumDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedAlbum = new Album(req.body);
    modifiedAlbum._id = id;
    const updatedAlbum = await Album.findByIdAndUpdate(id, modifiedAlbum);

    if (req.file) {
      deleteImgCloudinary(updatedAlbum.image);
    }

    if (req.file) {
      modifiedAlbum.image = req.file;
    }

    if (!updatedAlbum) {
      return next('Album not found');
    }
    return res.status(200).json(modifiedAlbum);
  } catch (error) {
    return next('Error updating Album', error);
  }
};

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  getAlbumByName,
  deleteAlbum,
  updateAlbumAdd,
  updateAlbumDelete,
};
