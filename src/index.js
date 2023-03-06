const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv');
const connect = require('../src/utils/connect');
const { configCloudinary } = require('../src/middlewares/files.middleware');
const SongsRoutes = require('./api/routes/songs.routes');
const AlbumsRoutes = require('./api/routes/albums.routes');
const ArtistsRoutes = require('./api/routes/artists.routes');
dotevn.config();

const server = express();
connect();

const PORT = process.env.PORT;

configCloudinary();

server.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));

server.use('/api/v1/songs', SongsRoutes);
server.use('/api/v1/albums', AlbumsRoutes);
server.use('/api/v1/artists', ArtistsRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route nor found');
  error.status = 404;
  return next(error);
});

server.use((error, req, res) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.disable('x-powered-by');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `);
});
