const express = require('express');
const AccessLogs = require('../models/accesslogs');
const emojis = require('./emojis');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const access = new AccessLogs({ path: req.path });
    await access.save();
    res.json({
      message: 'API - 👋🌎🌍🌏',
    });
  } catch (e) {
    res.status(500).send();
  }
});

router.use('/emojis', emojis);

module.exports = router;
