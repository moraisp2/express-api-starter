const express = require('express');
const AccessLogs = require('../models/accesslogs');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const access = new AccessLogs({ path: req.path });
    await access.save();
    res.json(['😀', '😳', '🙄']);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
