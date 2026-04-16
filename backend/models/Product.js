const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, default: 'General' },
  vendor: { type: String, required: true, default: 'Industrial Supply Co' },
  price: { type: Number, required: true, min: 0 }, // This is the unit price (Sales)
  purchasePrice: { type: Number, required: true, min: 0, default: 0 },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  monthlyTrend: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, // 12 months of sales data
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
