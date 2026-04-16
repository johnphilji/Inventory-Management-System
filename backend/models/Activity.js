const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'Inventory Update', 'Auth', 'Delete'
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
