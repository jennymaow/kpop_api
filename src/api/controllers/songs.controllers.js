const Song = require('../models/song.model');

const getAllSongs = async (req, res, next) => {
  try {
    /* const songs = await Song.find();
    return res.status(200).json(songs); */

    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numSongs = await Song.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 20;
      let numPages = numSongs % limit > 0 ? numSongs / limit + 1 : numSongs / limit;
      if (page > numPages) {
        page = 1;
      }

      const skip = (page - 1) * 20;

      const allSongs = await Song.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          total: numSongs,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1 ? `/api/v1/songs?page=${page + 1}&limit=${limit}` : null,
          prev: page != 1 ? `/api/v1/songs?page=${page - 1}&limit=${limit}` : null,
        },
        results: allSongs,
      });
    } else {
      const allSongs = await Song.find().limit(20);
      const numSongs = await Song.countDocuments();
      return res.status(200).json({
        info: {
          total: numSongs,
          page: 1,
          limit: 20,
          next: numSongs > 20 ? `/api/v1/songs?page=2&limit=20` : null,
          prev: null,
        },
        results: allSongs,
      });
    }
  } catch (error) {
    return next('Songs not found', error);
  }
};

const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    return res.status(200).json(song);
  } catch (error) {
    return next(error);
  }
};

const getSongByTitle = async (req, res, next) => {
  try {
    const title = req.params.title;
    const song = await Song.find({ title: title });
    return res.status(200).json(song);
  } catch (error) {
    return next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);
    return res.status(200).json(song);
  } catch (error) {
    return next('Error deleting character', error);
  }
};

const createSong = async (req, res, next) => {
  try {
    const newSong = new Song(req.body);

    const createdSong = await newSong.save();

    return res.status(201).json(createdSong);
  } catch (error) {
    return next('Error creating song', error);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedSong);
  } catch (error) {
    return next('Error updating song', error);
  }
};

module.exports = {
  createSong,
  getAllSongs,
  deleteSong,
  updateSong,
  getSongById,
  getSongByTitle,
};
