const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, default: 'Uncategorized' },
  quantity: { type: Number, default: 0, min: 0 },
  reorderLevel: { type: Number, default: 5 },
  unitPrice: { type: Number, required: true, min: 0 },
  supplier: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);