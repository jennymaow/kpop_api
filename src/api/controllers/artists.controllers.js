const Artist = require('../models/artist.model');

const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllArtists = async (req, res, next) => {
  try {
    const Artists = await Artist.find().populate({
      path: 'albums',
      populate: { path: 'songs' },
    });
    return res.status(200).json(Artists);
  } catch (error) {
    return next('Artists not found', error);
  }
};

const getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id).populate({
      path: 'albums',
      populate: { path: 'songs' },
    });
    return res.status(200).json(artist);
  } catch (error) {
    return next(error);
  }
};

const getArtistByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const artist = await Artist.find({ name: name }).populate({
      path: 'albums',
      populate: { path: 'songs' },
    });
    return res.status(200).json(artist);
  } catch (error) {
    return next(error);
  }
};
const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByIdAndDelete(id);

    if (artist.image) {
      deleteImgCloudinary(artist.image);
    }
    return res.status(200).json(artist);
  } catch (error) {
    return next('Error deleting character', error);
  }
};

const createArtist = async (req, res, next) => {
  try {
    const newArtist = new Artist({
      ...req.body,
      image: req.file ? req.file.path : 'Image not found',
    });

    const createdArtist = await newArtist.save();

    return res.status(201).json(createdArtist);
  } catch (error) {
    return next('Error creating Artist', error);
  }
};

const updateArtistAdd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedArtist = new Artist(req.body);
    modifiedArtist._id = id;
    const foundArtist = await Artist.findById(id);
    modifiedArtist.albums = [...modifiedArtist.albums, ...foundArtist.albums];
    modifiedArtist.members = [...modifiedArtist.members, ...foundArtist.members];
    const updatedArtist = await Artist.findByIdAndUpdate(id, modifiedArtist);

    if (req.file) {
      deleteImgCloudinary(updatedArtist.image);
    }

    if (req.file) {
      modifiedArtist.image = req.file.path;
    }

    if (!modifiedArtist) {
      return next('Album not found');
    }
    return res.status(200).json(updatedArtist);
  } catch (error) {
    return next('Error updating Artist', error);
  }
};

const updateArtistDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedArtist = new Artist(req.body);
    modifiedArtist._id = id;
    const updatedArtist = await Artist.findByIdAndUpdate(id, modifiedArtist);

    if (req.file) {
      deleteImgCloudinary(updatedArtist.image);
    }

    if (req.file) {
      modifiedArtist.image = req.file.path;
    }

    if (!modifiedArtist) {
      return next('Album not found');
    }
    return res.status(200).json(updatedArtist);
  } catch (error) {
    return next('Error updating Artist', error);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  getArtistByName,
  deleteArtist,
  updateArtistAdd,
  updateArtistDelete,
};
