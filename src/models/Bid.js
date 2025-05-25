const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    landId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land', required: true },
    bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, requried: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);