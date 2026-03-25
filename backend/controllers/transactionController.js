const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

const createTransaction = async (req, res) => {
  const { productId, type, quantity, note } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product quantity
    if (type === 'in') {
      product.quantity += quantity;
    } else if (type === 'out') {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      product.quantity -= quantity;
    }

    await product.save();

    const transaction = await Transaction.create({
      product: productId,
      type,
      quantity,
      note,
      user: req.user.id
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('product', 'name sku')
      .sort('-createdAt')
      .limit(100);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTransaction, getTransactions };