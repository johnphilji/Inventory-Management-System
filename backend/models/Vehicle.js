const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Freight Liner 01"
  plate: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "Heavy Truck", "Van"
  status: { type: String, enum: ['In Transit', 'Available', 'Maintenance'], default: 'Available' },
  lastMaintenance: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
