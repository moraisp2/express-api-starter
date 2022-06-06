const mongoose = require('mongoose');

const accessLogsSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: mongoose.now(),
  },
  path: {
    type: String,
  },
});

const AccessLogs = mongoose.model('AccessLogs', accessLogsSchema);

module.exports = AccessLogs;
