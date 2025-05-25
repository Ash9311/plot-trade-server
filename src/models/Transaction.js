const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    landId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Transaction', transactionSchema);