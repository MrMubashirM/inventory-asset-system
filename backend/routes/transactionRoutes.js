const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createTransaction, getTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.route('/')
  .post(protect, createTransaction)
  .get(protect, getTransactions);

module.exports = router;