const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

require('./db/mongoose');
const AccessLogs = require('./models/accesslogs');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const access = new AccessLogs({ path: req.path });
    await access.save();
    res.json({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  } catch (e) {
    res.status(500).send();
  }
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
